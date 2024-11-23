import { api } from '@/api/requestAPI'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStreamStore = defineStore('stream', () => {
  const streams = ref([])
  const allStreams = ref([])
  const recommendStreams = ref([])
  const recommendStreamers = ref([])
  const searchResults = ref([])
  const currentPage = ref(1)
  const size = ref(30)
  const loading = ref(false)
  const hasMore = ref(true)
  const sortBy = ref('recommendation')
  const error = ref(null)

  const currentStream = ref(null) // 현재 방송 데이터
  const isStreaming = ref(false)

  //전체 방송 목록 가져오기(무한 스크롤)
  const fetchChannels = async (params = {}, $state) => {
    //모든 데이터를 불러왔거나 현재 데이터 로딩 중인 상태라면 추가 요청을 보내지 않도록 함
    if (!hasMore.value || loading.value) return

    loading.value = true
    try {
      if (params.currentPage) currentPage.value = params.currentPage
      if (params.size) size.value = params.size

      const response = await api.get('/stream/list', {
        page: currentPage.value,
        size: size.value,
        sortBy: sortBy.value,
      })

      if (response.pageResponse.list.length) {
        streams.value.push(...response.pageResponse.list)
        currentPage.value++
        //$state?.loaded()
      } else {
        hasMore.value = false
        $state?.complete()
      }
    } catch (error) {
      console.error('방송 목록 조회 실패:', error)
      $state?.error()
    } finally {
      loading.value = false
    }
  }

  //정렬 옵션 바꾸기
  const changeSortOption = async newSortBy => {
    sortBy.value = newSortBy
    streams.value = []
    currentPage.value = 1
    hasMore.value = true
  }

  //메인뷰 추천 방송 목록 가져오기
  const fetchRecommendChannels = async (params = {}) => {
    loading.value = true
    try {
      const response = await api.get('/stream/list', {
        //page: params.page,
        size: params.size,
        sortBy: params.sortBy,
      })

      recommendStreams.value = response.pageResponse.list
    } catch (error) {
      console.error('방송 목록 조회 실패:', error)
    } finally {
      loading.value = false
    }
  }

  //사이드바 추천 스트리머 목록 가져오기
  const fetchRecommendStreamers = async () => {
    loading.value = true
    try {
      const response = await api.get('/stream/list', {
        page: Math.floor(Math.random() * 20) + 1,
        size: 5,
        sortBy: 'newest',
      })

      recommendStreamers.value = response.pageResponse.list
    } catch (error) {
      console.error('방송 목록 조회 실패:', error)
    } finally {
      loading.value = false
    }
  }

  //카테고리용 방송 목록 가져오기
  const fetchAllChannels = async () => {
    loading.value = true
    try {
      const response = await api.get('/stream/list', {
        size: 1000,
        sortBy: 'recommendation',
      })

      allStreams.value = response.pageResponse.list
    } catch (error) {
      console.error('방송 목록 조회 실패:', error)
    } finally {
      loading.value = false
    }
  }

  //검색결과 가져오기
  const performSearch = async (params = {}) => {
    loading.value = true
    try {
      const response = await api.get('/stream/list', {
        size: 20,
        sortBy: 'recommendation',
        search: params,
      })

      searchResults.value = response.pageResponse.list
    } catch (error) {
      console.error('방송 목록 조회 실패:', error)
    } finally {
      loading.value = false
    }
  }

  // 방송 시작
  const startStream = async () => {
    isStreaming.value = true
    currentStream.value = {
      // member_id: streamInfo.member_id,
      // member_nickname: streamInfo.member_nickname,

      stream_id: 0,
      // streamtag_num: streamInfo.streamtag_num,
      // streamtag_name: streamInfo.streamtag_name,
      // stream_title: streamInfo.stream_title,
      // stream_description: streamInfo.stream_description,
      stream_start_time: new Date(),
      stream_status: 'live',

      stream_view_count: 0,
      chatroom_status: 'active',
      stream_realtime_viewer_count: 1,
    }
    loading.value = true
    try {
      const response = await api.post('/stream/register', currentStream.value)

      currentStream.value.stream_id = response.stream_id
      streams.value.push(currentStream.value)

      console.log('등록한 방송 정보: ' + JSON.stringify(currentStream.value))
    } catch (error) {
      console.error('방송 등록 실패:', error)
    } finally {
      loading.value = false
    }
  }

  // 방송 종료
  const stopStream = () => {
    if (currentStream.value) {
      currentStream.value.stream_status = 'ended'
      currentStream.value.stream_end_time = new Date()
    }
    isStreaming.value = false
  }

  return {
    streams,
    allStreams,
    recommendStreams,
    recommendStreamers,
    searchResults,
    currentPage,
    size,
    loading,
    hasMore,
    sortBy,
    error,
    fetchChannels,
    changeSortOption,
    fetchRecommendChannels,
    fetchRecommendStreamers,
    fetchAllChannels,
    performSearch,
    startStream,
    stopStream,
  }
})
