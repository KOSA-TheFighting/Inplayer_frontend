<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '@/api/requestAPI.js'
import { useMemberStore } from '@/stores/member'

const currentRoute = useRoute()
const memberStore = useMemberStore()
//const code = currentRoute.query.code;

const getKakaoToken = async code => {
  if (!code) {
    throw new Error('카카오 인증 실패')
  }
  try {
    const response = await api.get('/kakao/oauth/callback', { code })
    return response
  } catch (error) {
    console.error('카카오 연동 실패:', error)
    throw new Error('카카오 연동 실패')
  }
}

onMounted(async () => {
  memberStore.kakaoCode = currentRoute.query.code // 쿼리 파라미터에서 code 추출
  if (!memberStore.kakaoCode) {
    console.error('인증 코드가 없습니다.')
    return
  }
  try {
    const token = await getKakaoToken(memberStore.kakaoCode)
    memberStore.login(token)
  } catch (error) {
    console.error('로그인 처리 중 에러:', error)
  }
})

// const token = getKakaoToken(code)
// token.then(map => {
//   memberStore.login(map)
// })
</script>

<template>
  <div>카카오 계정으로 로그인했습니다</div>
</template>

<style scoped></style>
