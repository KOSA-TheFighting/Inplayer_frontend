<script setup>
import { useRoute } from 'vue-router'
import { api } from '@/api/requestAPI.js'

const currentRoute = useRoute()
const code = currentRoute.query.code

const getKakaoToken = async code => {
  const result = await api.get('/kakao/oauth/callback', { code: code })
  alert(result.accessToken)
  return result
}

getKakaoToken(code)
</script>

<template>
  <div>카카오 계정으로 로그인했습니다</div>
</template>

<style scoped></style>
