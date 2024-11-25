<script setup>
import CamConnectButton from '@/components/common/CamConnectButton.vue'
import FollowButton from '@/components/common/FollowButton.vue'
import StartStreamButton from '@/components/common/StartStreamButton.vue'
import StreamInfoInputForm from '@/components/stream/StreamInfoInputForm.vue'
import router from '@/router/index.js'
import { useStreamStore } from '@/stores/stream'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const streamStore = useStreamStore()
const stream_id = route.params.stream_id

//방송 캠 및 채팅 설정용
const isCamConnected = ref(false)
const isRemoteCamConnected = ref(false)
const isBroadcaster = ref(false)
let localStream = undefined
const localVideoRef = ref(null)
const remoteStreamRef = ref(null)

const roomId = ref(null)
const camKey = localStorage.getItem('myInfo')

let pcListMap = new Map()
let otherKeyList = []
let socket = new SockJS('/signaling')
let stompClient = Stomp.over(socket)
//stompClient.debug = null
stompClient.debug = log => {
  // if (JSON.stringify(log).includes('SUBSCRIBE')) {
  //   return
  // }
  if (JSON.stringify(log).includes('Opening Web Socket...')) {
    stompClientHandler()
  }
  console.log('stompClient--------------', log)
}

const startCam = async () => {
  if (navigator.mediaDevices !== undefined) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      })

      console.log('Stream found')
      localStream = stream
      stream.getAudioTracks()[0].enabled = true

      // ref를 사용하여 video 요소에 접근
      localVideoRef.value.srcObject = stream
      isCamConnected.value = true
    } catch (error) {
      console.error('Error accessing media devices:', error)
    }
  }
}

const stompClientHandler = () => {
  console.log('Connected to WebRTC server')

  // 방송자 여부 확인을 위한 구독
  stompClient.subscribe('/topic/room/status/' + roomId.value, message => {
    const roomStatus = JSON.parse(message.body)
    console.log('[Room Status]', roomStatus)

    if (roomStatus.hasBroadcaster && !isBroadcaster.value) {
      console.log('[Viewer] Found broadcaster:', roomStatus.broadcasterKey)
      if (!otherKeyList.includes(roomStatus.broadcasterKey)) {
        otherKeyList.push(roomStatus.broadcasterKey)
      }
      requestBroadcastStream()
    }
  })
  // ICE candidate 구독
  stompClient.subscribe(
    '/topic/peer/iceCandidate/' + camKey + '/' + roomId.value,
    candidate => {
      const key = JSON.parse(candidate.body).key
      const message = JSON.parse(candidate.body).body

      if (pcListMap.has(key)) {
        pcListMap.get(key).addIceCandidate(
          new RTCIceCandidate({
            candidate: message.candidate,
            sdpMLineIndex: message.sdpMLineIndex,
            sdpMid: message.sdpMid,
          }),
        )
        console.log('Added ICE candidate for:', key)
      }
    },
  )

  // Offer 구독
  stompClient.subscribe(
    '/topic/peer/offer/' + camKey + '/' + roomId.value,
    async offer => {
      const key = JSON.parse(offer.body).key
      const message = JSON.parse(offer.body).body

      if (!pcListMap.has(key)) {
        pcListMap.set(key, createPeerConnection(key))
      }

      await pcListMap.get(key).setRemoteDescription(
        new RTCSessionDescription({
          type: message.type,
          sdp: message.sdp,
        }),
      )
      sendAnswer(pcListMap.get(key), key)
      console.log('Processed offer from:', key)
    },
  )

  // Answer 구독
  stompClient.subscribe(
    '/topic/peer/answer/' + camKey + '/' + roomId.value,
    answer => {
      const key = JSON.parse(answer.body).key
      const message = JSON.parse(answer.body).body

      pcListMap
        .get(key)
        .setRemoteDescription(new RTCSessionDescription(message))
      console.log('Processed answer from:', key)
    },
  )

  console.log('채팅구독.................................' + roomId.value)
  // 채팅 구독
  stompClient.subscribe('/topic/chat/' + roomId.value, message => {
    console.log('채팅수신 완료')
    const chatMessage = JSON.parse(message.body)
    const chatBox = document.querySelector('#chatBox')
    const newMessage = document.createElement('div')
    newMessage.textContent =
      '[' + chatMessage.sender + ']: ' + chatMessage.message
    newMessage.classList.add('message')
    chatBox.appendChild(newMessage)
    chatBox.scrollTop = chatBox.scrollHeight
    console.log('채팅메시지', newMessage)
  })

  // Key 관련 구독
  stompClient.subscribe('/topic/call/key', () => {
    stompClient.send('/app/send/key', {}, JSON.stringify(camKey))
    console.log('Sent camKey in response to call')
  })

  stompClient.subscribe('/topic/send/key', message => {
    const key = JSON.parse(message.body)
    console.log('Received key:', key, 'Current key:', camKey)

    if (key && camKey !== key) {
      if (!otherKeyList.includes(key)) {
        console.log('Adding new key to list:', key)
        otherKeyList.push(key)

        // 시청자이고 새로운 방송자가 들어왔을 때 자동으로 연결 시도
        if (!isBroadcaster.value) {
          const pc = createPeerConnection(key)
          pcListMap.set(key, pc)
          sendOffer(pc, key)
          console.log('Created new peer connection for:', key)
        }
      }
    }
  })

  // 방 상태 확인 요청
  stompClient.send('/app/room/status/' + roomId.value, {}, {})
}

// --------------------------------------------------------------------------
const connectSocket = async () => {
  return new Promise((resolve, reject) => {
    try {
      const socket = new SockJS('/signaling')
      stompClient = Stomp.over(socket)

      stompClient.connect(
        {
          roomId: roomId.value,
          camKey: camKey,
        },
        () => {
          console.log('WebSocket 연결 완료')

          // 채팅 구독
          stompClient.subscribe('/topic/chat/' + roomId.value, message => {
            console.log('채팅 메시지 수신:', message)
            try {
              const chatMessage = JSON.parse(message.body)
              console.log('파싱된 채팅:', chatMessage)

              const chatBox = document.querySelector('#chatBox')
              if (!chatBox) {
                console.error('채팅박스 엘리먼트를 찾을 수 없습니다')
                return
              }

              const newMessage = document.createElement('div')
              newMessage.textContent = `[${chatMessage.nickname}]: ${chatMessage.message}`
              newMessage.classList.add('message')
              if (chatMessage.nickname === localStorage.getItem('nickname')) {
                newMessage.style.color = '#ff9f00'
              }
              chatBox.appendChild(newMessage)
              chatBox.scrollTop = chatBox.scrollHeight

              console.log('채팅 메시지 추가 완료')
            } catch (error) {
              console.error('채팅 메시지 처리 중 오류:', error)
            }
          })

          // 방 상태 구독
          stompClient.subscribe(
            '/topic/room/status/' + roomId.value,
            message => {
              try {
                const roomStatus = JSON.parse(message.body)
                console.log('[Room Status]', roomStatus)

                if (roomStatus.hasBroadcaster && !isBroadcaster.value) {
                  console.log(
                    '[Viewer] Found broadcaster:',
                    roomStatus.broadcasterKey,
                  )
                  if (!otherKeyList.includes(roomStatus.broadcasterKey)) {
                    otherKeyList.push(roomStatus.broadcasterKey)
                  }
                  requestBroadcastStream()
                }
              } catch (error) {
                console.error('방 상태 처리 중 오류:', error)
              }
            },
          )

          // Key 요청에 대한 구독
          stompClient.subscribe('/topic/call/key', () => {
            console.log('Key 요청 받음')
            stompClient.send('/app/send/key', {}, JSON.stringify(camKey))
          })

          // 새로운 Key 수신에 대한 구독
          stompClient.subscribe('/topic/send/key', message => {
            const key = JSON.parse(message.body)
            console.log('새로운 key 수신:', key)

            if (key && camKey !== key) {
              if (!otherKeyList.includes(key)) {
                console.log('새로운 참가자 추가:', key)
                otherKeyList.push(key)

                // 방송자가 아닐 때만 연결 시도
                if (!isBroadcaster.value) {
                  console.log('시청자로서 연결 시도')
                  const pc = createPeerConnection(key)
                  pcListMap.set(key, pc)
                  sendOffer(pc, key)
                }
              }
            }
          })

          // 초기 방 상태 확인 요청
          stompClient.send('/app/room/status/' + roomId.value, {}, {})

          resolve()
        },
        error => {
          console.error('WebSocket 연결 오류:', error)
          reject(error)
        },
      )
    } catch (error) {
      console.error('소켓 초기화 오류:', error)
      reject(error)
    }
  })
}

// 시청자의 스트림 요청 함수 수정
const requestBroadcastStream = async () => {
  console.log('[시청자] 방송 요청...')

  await stompClient.send('/app/call/key', {}, {})

  setTimeout(() => {
    if (otherKeyList.length > 0) {
      otherKeyList.forEach(key => {
        if (!pcListMap.has(key)) {
          const pc = createPeerConnection(key)
          pcListMap.set(key, pc)
          sendOffer(pc, key)
          console.log('[시청자] 방송자와 연결 시도:', key)
        }
      })
    } else {
      console.log('[시청자] 방송자를 찾을 수 없음, 재시도...')
      setTimeout(requestBroadcastStream, 3000)
    }
  }, 1000)
}

// 방송 시작 함수
const startBroadcasting = async () => {
  if (!isBroadcaster.value || !localStream) {
    console.error('방송 시작 불가: 방송자 아님 또는 스트림 없음')
    return
  }

  console.log('방송 시작...')

  // 방송 시작 상태를 서버에 알림
  await stompClient.send(
    '/app/room/broadcast/start/' + roomId.value,
    {},
    JSON.stringify({
      broadcasterKey: camKey,
    }),
  )

  console.log('방송 시작 알림 전송 완료')
}

const createPeerConnection = otherKey => {
  console.log('[PeerConnection] Creating for:', otherKey)
  const pc = new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
    ],
  })

  try {
    // ICE candidate 이벤트 처리
    pc.addEventListener('icecandidate', event => {
      onIceCandidate(event, otherKey)
    })

    // 스트림 받았을 때의 이벤트 처리
    pc.addEventListener('track', event => {
      console.log('[PeerConnection] Received track:', event)
      onTrack(event, otherKey)
    })

    // 방송자인 경우에만 로컬 스트림 추가
    if (isBroadcaster.value && localStream) {
      console.log('[방송자] 로컬 스트림 추가')
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream)
      })
    }

    return pc
  } catch (error) {
    console.error('[PeerConnection] Error:', error)
    throw error
  }
}

const handleConnectionFailure = otherKey => {
  const pc = pcListMap.get(otherKey)
  if (pc) {
    console.log('[Connection] Attempting to reconnect with:', otherKey)
    pc.close()
    pcListMap.delete(otherKey)
    removeVideoElement(otherKey) // 비디오 요소 제거

    // 재연결 시도
    setTimeout(() => {
      const newPc = createPeerConnection(otherKey)
      pcListMap.set(otherKey, newPc)
      sendOffer(newPc, otherKey)
    }, 1000)
  }
}

const onTrack = (event, otherKey) => {
  console.log('[Stream] Received stream for:', otherKey)

  const streamId = `video-${otherKey}`
  const existingVideo = document.querySelector(`#${streamId}`)

  if (!existingVideo && event.streams[0]) {
    const video = document.createElement('video')
    video.id = streamId
    video.autoplay = true
    video.playsInline = true
    video.srcObject = event.streams[0]

    const remoteStreamDiv = document.querySelector('#remoteStreamDiv')
    if (remoteStreamDiv) {
      remoteStreamDiv.appendChild(video)
      console.log('[Stream] Added new video element')
    }
  }
}

// 비디오 요소 제거를 위한 헬퍼 함수 추가
const removeVideoElement = otherKey => {
  const safeId = `video-${otherKey.replace(/[^a-zA-Z0-9]/g, '-')}`
  const video = document.querySelector(`#${safeId}`)
  if (video) {
    video.srcObject = null
    video.remove()
    console.log('[Stream] Removed video element for:', otherKey)
  }
}

const onIceCandidate = (event, otherKey) => {
  if (event.candidate) {
    console.log('[ICE] New candidate:', event.candidate.type)
    stompClient.send(
      '/app/peer/iceCandidate/' + otherKey + '/' + roomId.value,
      {},
      JSON.stringify({
        key: camKey,
        body: event.candidate,
      }),
    )
  } else {
    console.log('[ICE] All candidates gathered')
  }
}

const sendOffer = (pc, otherKey) => {
  const offerOptions = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true,
    iceRestart: true, // ICE 재시작 옵션 추가
  }

  pc.createOffer(offerOptions)
    .then(offer => {
      console.log('[Offer] Created for:', otherKey)
      // SDP 수정하여 더 나은 호환성 제공
      offer.sdp = enhanceSdp(offer.sdp)
      setLocalAndSendMessage(pc, offer)
      stompClient.send(
        '/app/peer/offer/' + otherKey + '/' + roomId.value,
        {},
        JSON.stringify({
          key: camKey,
          body: offer,
        }),
      )
      console.log('[Offer] Sent to:', otherKey)
    })
    .catch(error => {
      console.error('[Offer] Failed to create:', error)
      handleConnectionFailure(otherKey)
    })
}

const sendAnswer = (pc, otherKey) => {
  pc.createAnswer().then(answer => {
    setLocalAndSendMessage(pc, answer)
    stompClient.send(
      '/app/peer/answer/' + otherKey + '/' + roomId.value,
      {},
      JSON.stringify({
        key: camKey,
        body: answer,
      }),
    )
    console.log('Send answer')
  })
}

const setLocalAndSendMessage = (pc, sessionDescription) => {
  pc.setLocalDescription(sessionDescription)
}

// SDP 향상을 위한 함수
const enhanceSdp = sdp => {
  let modifiedSdp = sdp

  // UDP 우선순위 설정
  modifiedSdp = modifiedSdp.replace(
    /a=candidate.*udp.*typ host/gi,
    match => `${match} network-cost 50`,
  )

  // 비디오 코덱 최적화
  if (modifiedSdp.includes('VP8')) {
    modifiedSdp = modifiedSdp.replace(
      /(m=video.*)\r\n/g,
      '$1\r\na=rtpmap:96 VP8/90000\r\na=rtcp-fb:96 nack\r\na=rtcp-fb:96 nack pli\r\na=rtcp-fb:96 ccm fir\r\n',
    )
  }

  return modifiedSdp
}

function sendMessage() {
  if (!stompClient || !stompClient.connected) {
    console.error('WebSocket이 연결되지 않았습니다')
    return
  }
  if (!localStorage.getItem('myInfo')) {
    alert('로그인이 필요한 서비스입니다.')

    return
  }

  const message = document.querySelector('#chatInput').value
  if (message) {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const id = roomId.value

    const formattedTime =
      year +
      '-' +
      month +
      '-' +
      day +
      ' ' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds

    const chatMessage = {
      type: '1002',
      roomId: id,
      sender: localStorage.getItem('myInfo'),
      nickname: localStorage.getItem('nickname'),
      message: message,
      time: formattedTime,
    }

    console.log('채팅메시지', chatMessage)
    stompClient.send('/app/chat/' + id, {}, JSON.stringify(chatMessage))
    document.querySelector('#chatInput').value = ''
  }
}

// 방송 종료 시 호출되는 함수
window.addEventListener('beforeunload', () => {
  if (isBroadcaster.value) {
    stompClient.send('/app/room/broadcast/end/' + roomId.value, {}, {})
  }

  // 스트림 정리
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop())
  }

  // 피어 연결 정리
  pcListMap.forEach(pc => {
    pc.close()
  })
  pcListMap.clear()
})

// ------------------------------여기까기가 방송 및 채팅 설정 메서드------------------------------------
const goToNotices = () => {
  router.push({ name: 'announcementlist' })
}

const connectCam = async () => {
  try {
    await startCam()
  } catch (error) {
    console.error('캠 연결 실패:', error)
    alert('캠을 연결하지 못했습니다.')
  }
}

const handleStartStream = async () => {
  if (streamStore.currentStream?.stream_title) {
    try {
      // 1. 방송 정보 등록
      await streamStore.startStream()
      const streamId = streamStore.currentStream.stream_id

      // 2. 방송자 설정
      isBroadcaster.value = true
      roomId.value = streamId

      // 3. 웹캠 및 방송 설정
      await startCam() // 웹캠 시작
      await connectSocket() // 소켓 연결
      await startBroadcasting() // 방송 시작

      // 4. URL 변경 및 상태 업데이트
      await router.replace({
        name: 'broadcast',
        params: { stream_id: streamId },
      })

      alert('방송을 시작합니다.')
    } catch (error) {
      console.error('방송 시작 실패:', error)
      alert('방송 시작 중 오류가 발생했습니다.')
      // 에러 발생 시 정리
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop())
      }
    }
  } else {
    alert('방송 정보를 업데이트 해주세요.')
  }
}
onMounted(async () => {
  // URL의 stream_id와 현재 방송 정보가 일치하는지 확인
  const urlStreamId = route.params.stream_id
  if (
    isBroadcaster.value &&
    streamStore.currentStream.stream_id === parseInt(urlStreamId)
  ) {
    // 이미 설정된 방송이면 연결만 유지
    console.log('기존 방송 연결 유지')
  } else if (urlStreamId) {
    // 시청자로 접속
    roomId.value = parseInt(urlStreamId)
    await connectSocket()
  }
})
// 라우터 가드 추가
router.beforeEach((to, from, next) => {
  if (to.name === 'broadcast' && from.name === 'broadcast') {
    // 같은 broadcast 페이지 내에서의 이동일 경우
    // 기존 연결 유지
    next()
  } else {
    next()
  }
})

//beforeRouteUpdate 훅을 사용하면 경로가 변경되었을 때도 기존 컴포넌트의 상태를 유지
</script>

<template>
  <div class="container">
    <!-- Main Broadcast Section -->
    <main class="broadcast">
      <div class="broadcast-video">
        <video ref="localVideoRef" v-show="isCamConnected" autoplay></video>
        <div ref="remoteStreamRef" v-show="isRemoteCamConnected"></div>

        <img
          v-show="!isCamConnected && !isRemoteCamConnected"
          src="@/assets/방송준비중.png"
          alt="Main Broadcast"
        />
      </div>
    </main>

    <!-- Chat Section -->
    <section class="chat">
      <h2>채팅창</h2>
      <div id="chatBox" class="chat-messages">
        <!-- 채팅 메시지 영역 (예시) <div class="message">채팅메시지123</div> -->
      </div>
      <div class="chat-input">
        <input
          type="text"
          id="chatInput"
          @keyup.enter="sendMessage"
          placeholder="채팅 입력창"
        />
        <button type="button" @click="sendMessage">입력</button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-info">
        <!-- <span>방송 정보</span> -->
      </div>
      <div class="footer-actions">
        <template v-if="stream_id === '0'">
          <CamConnectButton @click="connectCam" />
          <StartStreamButton @click="handleStartStream" />
        </template>
        <template v-else>
          <FollowButton />
        </template>
        <button class="notice-button" @click="goToNotices">공지사항</button>
      </div>
    </footer>

    <StreamInfoInputForm v-if="stream_id === '0'" />
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  display: grid;
  grid-template-areas:
    'broadcast chat'
    'footer footer';
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 100px;
  gap: 10px;
  background-color: #2d2d2d;
  font-family: Arial, sans-serif;
}

/* Main Broadcast Section */
.broadcast {
  grid-area: broadcast;
  background-color: #2d2d2d;
  color: #2d2d2d;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.broadcast-video {
  width: 100%;
}

.broadcast-video video {
  width: 100%;
}

.broadcast-video img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Chat Section */
.chat {
  grid-area: chat;
  background-color: #272626;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chat h2 {
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 10px;
  text-align: center;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  padding: 8px;
  background-color: #272626;
  color: #ffffff;
  margin-bottom: auto;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.chat-input {
  display: flex;
  gap: 10px;
}

.chat-input input {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #5c5757;
  border-radius: 5px;
  background-color: #5c5757;
  color: #ffffff;
}

.chat-input input::placeholder {
  color: rgb(255, 255, 255);
}

.chat-input input:focus::placeholder {
  color: transparent;
}

.chat-input button {
  padding: 10px 20px;
  background-color: #5c5757;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #574d4d;
}

/* Footer */
.footer {
  grid-area: footer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #272626;
  border-top: 1px solid #ddd;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer-info {
  flex: 1;
  font-size: 16px;
  color: #ffffff;
}

.footer-actions > * {
  margin-left: 10px; /* 방송 정보에서 떨어져 있는 간격 */
}

.notice-button {
  padding: 10px 15px;
  background-color: #4caf50; /* 초록색 배경 */
  color: #fff; /* 흰색 텍스트 */
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 부드러운 색상 전환 효과 */
  margin-left: 400px;
}

.notice-button:hover {
  background-color: #388e3c; /* 더 진한 초록색으로 변경 */
}
</style>
