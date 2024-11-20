<script setup>
const handleKakaoLogin = () => {
  const params = {
    redirectUri: 'http://localhost:5173/oauth/kakao',
  }
  window.Kakao.Auth.authorize(params)
}
</script>

<template>
  <div class="main-container">
    <div class="text-center">
      <button id="kakao-login-btn" @click="handleKakaoLogin">
        <img
          src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
          width="222"
          alt="카카오 로그인"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  background-color: aliceblue;
}
</style>
