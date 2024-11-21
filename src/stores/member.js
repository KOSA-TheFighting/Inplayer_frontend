import { api } from '@/api/requestAPI'
import router from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMemberStore = defineStore('member', () => {
  const isLoggedIn = ref(false)
  const myInfo = ref(null) //내 로그인 정보
  const kakaoCode = ref(null) //카카오로부터 받은 코드

  const memberInfo = ref(null) //조회용 다른사람 정보
  const loading = ref(false)
  const error = ref(null)

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
    }
  }

  return {
    isLoggedIn,
    myInfo,
    kakaoCode,
    memberInfo,
    error,
    getMemberInfo,
    login,
    logout,
    initializeAuth,
  }
})
