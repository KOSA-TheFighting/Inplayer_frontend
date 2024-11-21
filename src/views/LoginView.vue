<script setup>
import router from '@/router/index.js'

const goToHomePage = () => {
  router.push({ name: 'home' })
}

const KAKAO_CLIENT_ID = '8327d68228a934423bed1bd4436581fd'

const handleKakaoLogin = async () => {
  try {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_CLIENT_ID)
    }

    // 현재 로그인 상태 확인
    if (window.Kakao.Auth.getAccessToken()) {
      await window.Kakao.Auth.logout()
    }

    // 로그인 페이지로 리다이렉트
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent('http://localhost:5173/oauth/kakao')}&response_type=code&prompt=login`
  } catch (error) {
    console.error('카카오 로그인 에러:', error)
  }
}
</script>

<template>
  <div class="login-container">
    <button class="logo" @click="goToHomePage">
      <img src="@/assets/Inplayer1.png" alt="Logo" />
    </button>

    <p class="subtitle">로그인 후 더 많은 서비스를 즐겨보세요.</p>
    <form class="login-form">
      <input type="text" placeholder="아이디" class="input-field" />
      <input type="password" placeholder="비밀번호" class="input-field" />

      <button type="button" class="login-btn">로그인</button>
    </form>
    <div class="social-login">
      <p>또는</p>
      <div class="social-buttons">
        <button id="kakao-login-btn" @click="handleKakaoLogin">
          <img
            src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
            alt="카카오 로그인"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  background-color: aliceblue;
}
.login-container {
  width: 100%;
  height: 100vh; /* 화면 전체 높이 사용 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  font-family: Arial, sans-serif;
  background-color: #fffcfc;
  padding: 40px;
}

.logo {
  border: none;
  background-color: #fdfdfd;
  cursor: pointer;
}

.logo img {
  height: auto;
  width: 150px;
  margin: -20px 20px;
  color: white;
}

.subtitle {
  font-size: 14px;
  color: #1c1616;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  gap: 10px;
  padding: 10px 20px;
  width: 300px; /* 기본적으로 자동으로 너비 설정 */
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #1c1616;
  border-radius: 4px;
  display: flex; /* 플렉스 레이아웃 적용 */
}

.login-btn {
  background-color: #dff140;
  color: #1c1616;
  padding: 10px 30px; /* 상하 10px, 좌우 20px로 설정 (좌우 여백 축소) */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 320px; /* 기본적으로 자동으로 너비 설정 */
  margin-bottom: -20px;
}

.social-login {
  margin-top: 20px;
  color: #1c1c1c;
  width: 40px;
  font-size: 80%;
}

.social-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.social-buttons button {
  border: none;
  background-color: #fdfdfd;
  cursor: pointer;
}

.help-links a {
  color: #1c1616; /* 하이퍼링크 색상을 흰색으로 설정 */
  text-decoration: none; /* 하이퍼링크 밑줄 제거 (선택 사항) */
}
</style>
