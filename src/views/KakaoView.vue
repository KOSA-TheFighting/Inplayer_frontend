<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/api/requestAPI.js'
import { useMemberStore } from '@/stores/member'

const currentRoute = useRoute()
const router = useRouter()
const memberStore = useMemberStore()
const newNickname = ref('')
const isLoading = ref(false)
const nicknameError = ref('')

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
  const kakaoCode = currentRoute.query.code
  if (!kakaoCode) {
    console.error('인증 코드가 없습니다.')
    return
  }

  try {
    isLoading.value = true
    const token = await getKakaoToken(kakaoCode)
    await memberStore.login(token)
    showNotification('success', '성공적으로 로그인 하셨습니다.')
  } catch (error) {
    console.error('로그인 처리 중 에러:', error)
  } finally {
    isLoading.value = false
  }
})

// 닉네임 유효성 검사
const validateNickname = () => {
  if (newNickname.value.length < 2) {
    nicknameError.value = '닉네임은 2자 이상이어야 합니다.'
    return false
  }
  if (newNickname.value.length > 12) {
    nicknameError.value = '닉네임은 12자 이하여야 합니다.'
    return false
  }
  nicknameError.value = ''
  return true
}

// 닉네임 제출
const submitNickname = async () => {
  if (!validateNickname()) return

  try {
    isLoading.value = true
    await memberStore.updateNickname(newNickname.value)
    //showNotification('success', '닉네임이 성공적으로 수정되었습니다.')
    router.push({ name: 'home' })
  } catch (error) {
    console.error('닉네임 수정 실패:', error)
    showNotification('error', '닉네임 수정에 실패했습니다.')
  } finally {
    isLoading.value = false
  }
}

// 알림 표시 함수
const showNotification = (type, message) => {
  // 실제 구현에서는 토스트 또는 알림 라이브러리 사용
  alert(message)
}
</script>

<template>
  <div class="welcome-container">
    <div class="welcome-content">
      <h1 class="welcome-title">인플레이어의 회원이 되신 것을 환영합니다!</h1>

      <div class="welcome-description">
        <h2>인플레이어에서 사용하실 닉네임을 작성해주세요.</h2>
        <p class="subtitle">다른 사용자들에게 보여질 이름입니다.</p>
      </div>

      <div class="nickname-form">
        <div class="input-group">
          <input
            v-model="newNickname"
            type="text"
            placeholder="닉네임을 입력해주세요."
            :class="{ error: nicknameError }"
            @keydown.enter="submitNickname"
            @input="validateNickname"
          />
          <span class="error-message" v-if="nicknameError">{{
            nicknameError
          }}</span>
        </div>

        <button @click="submitNickname" class="submit-button">
          <span v-if="isLoading" class="loading-spinner"></span>
          <span v-else>시작하기</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  min-height: 80vh;
  min-width: 80vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 2rem;
  box-sizing: border-box;
  overflow-x: hidden;
}

.welcome-content {
  max-width: 1200px; /* 기존 600px에서 증가 */
  width: 90%; /* percentage로 변경하여 반응형 지원 */
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 4rem 3rem; /* 패딩값 증가 */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 반응형 미디어 쿼리 추가 */
@media (max-width: 1000px) {
  .welcome-content {
    width: 95%;
    padding: 3rem 2rem;
  }
}

@media (max-width: 768px) {
  .welcome-container {
    padding: 1rem;
  }

  .welcome-content {
    width: 100%;
    padding: 2rem 1.5rem;
  }
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(45deg, #e3f441, #69cddc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.welcome-description {
  margin-bottom: 3rem;
}

.welcome-description h2 {
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.subtitle {
  color: #a0a0a0;
  font-size: 1rem;
}

.nickname-form {
  max-width: 400px;
  margin: 0 auto;
}

.input-group {
  margin-bottom: 1.5rem;
  position: relative;
}

input {
  width: 70%;
  padding: 1rem 1.25rem;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(227, 244, 65, 0.3);
  border-radius: 12px;
  color: #ffffff;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #e3f441;
  box-shadow: 0 0 0 3px rgba(227, 244, 65, 0.2);
}

input.error {
  border-color: #ff4646;
}

.error-message {
  position: absolute;
  left: 0;
  bottom: -1.5rem;
  color: #ff4646;
  font-size: 0.875rem;
}

.submit-button {
  width: 80%;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  background: linear-gradient(45deg, #e3f441, #69cddc);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(227, 244, 65, 0.3);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(26, 26, 26, 0.3);
  border-radius: 50%;
  border-top-color: #1a1a1a;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .welcome-content {
    padding: 2rem 1rem;
  }

  .welcome-title {
    font-size: 2rem;
  }

  .welcome-description h2 {
    font-size: 1.25rem;
  }
}
</style>
