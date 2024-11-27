import { api } from '@/api/requestAPI'
import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMemberStore = defineStore('member', () => {
  const isLoggedIn = ref(false)
  const myInfo = ref(null) //내 로그인 정보

  const memberInfo = ref(null) //조회용 다른사람 정보
  const loading = ref(false)
  const error = ref(null)
  const nickname = ref(null)

  //멤버 정보 가져오기
  const getMemberInfo = async member_id => {
    loading.value = true
    try {
      const response = await api.get('/member/getInfo/' + member_id)
      memberInfo.value = response
    } catch (error) {
      console.error('멤버 목록 조회 실패:', error)
    } finally {
      loading.value = false
    }
  }

  //로그인
  function login(token) {
    localStorage.setItem('accessToken', token.accessToken)
    localStorage.setItem('refreshToken', token.refreshToken)
    localStorage.setItem('myInfo', token.member_id)

    isLoggedIn.value = true
    myInfo.value = token.member_id
  }

  //로그아웃
  function logout() {
    //window.Kakao.Auth.logout(() => {}, localStorage.getItem('accessToken'))
    isLoggedIn.value = false
    myInfo.value = null

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('myInfo')
    localStorage.removeItem('nickname')
    alert('로그아웃 했습니다.')
    router.push({ name: 'home' })
  }

  //페이지 새로고침 대비용 로그인상태 유지
  function initializeAuth() {
    const storedAccessToken = localStorage.getItem('accessToken')
    const storedRefreshToken = localStorage.getItem('refreshToken')

    if (storedAccessToken && storedRefreshToken) {
      isLoggedIn.value = true
      myInfo.value = localStorage.getItem('myInfo')
      nickname.value = localStorage.getItem('nickname')
    }
  }
  // 닉네임 수정
  const updateNickname = async newNickname => {
    try {
      console.log('member_id = ', myInfo.value)
      if (!myInfo.value) {
        throw new Error('멤버 정보가 없습니다.')
      }

      const member_id = myInfo.value
      loading.value = true

      // member_id와 newNickname을 params로 전송
      await api.patch('/member/updateNickname', null, {
        member_id,
        newNickname,
      })
      // Pinia 상태 업데이트
      nickname.value = newNickname // 닉네임 변경
      localStorage.setItem('nickname', newNickname) // 새 닉네임 저장

      alert('닉네임 등록 완료!')
    } catch (err) {
      error.value = '닉네임 수정에 실패했습니다.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    isLoggedIn,
    myInfo,
    memberInfo,
    error,
    getMemberInfo,
    login,
    logout,
    initializeAuth,
    loading,
    updateNickname,
  }
})
