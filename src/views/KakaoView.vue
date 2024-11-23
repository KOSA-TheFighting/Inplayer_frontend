<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/api/requestAPI.js'
import { useMemberStore } from '@/stores/member'

const currentRoute = useRoute()
const router = useRouter()
const memberStore = useMemberStore()
const newNickname = ref('')

// 카카오 토큰 가져오기
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

// 페이지 로드 시 실행
onMounted(async () => {
  memberStore.kakaoCode = currentRoute.query.code // 쿼리 파라미터에서 code 추출
  if (!memberStore.kakaoCode) {
    console.error('인증 코드가 없습니다.')
    return
  }
  try {
    const token = await getKakaoToken(memberStore.kakaoCode)
    memberStore.login(token)
    alert('성공적으로 로그인 하셨습니다.') // 알람 표시
  } catch (error) {
    console.error('로그인 처리 중 에러:', error)
    alert('로그인에 실패했습니다.')
  }
})

// 닉네임 제출
const submitNickname = async () => {
  try {
    await memberStore.updateNickname(newNickname.value)
    alert('닉네임이 성공적으로 수정되었습니다.')
    router.push({ name: 'home' }) // home으로 리다이렉트
  } catch (error) {
    console.error('닉네임 수정 실패:', error)
    alert('닉네임 수정에 실패했습니다.')
  }
}
</script>

<template>
  <div>
    <h1>닉네임 수정</h1>
    <label>
      새 닉네임:
      <input v-model="newNickname" type="text" placeholder="새 닉네임 입력" />
    </label>
    <button @click="submitNickname">확인</button>
  </div>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 1rem;
}
button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
