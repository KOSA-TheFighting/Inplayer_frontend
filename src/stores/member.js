import { api } from '@/api/requestAPI'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMemberStore = defineStore('member', () => {
  const isLoggedIn = ref(false)
  const memberInfo = ref(null)
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

  return {
    isLoggedIn,
    memberInfo,
    error,
    getMemberInfo,
  }
})
