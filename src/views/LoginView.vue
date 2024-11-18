<script setup>
const handleKakaoLogin = () => {
  window.location.href = '/api/member/auth/kakao/login'
}
</script>

<template>
  <div class="text-center">
    <button
      id="kakao-login-btn"
      @click="handleKakaoLogin"
      style="border: none; background-color: white"
    >
      <img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="222"
        alt="카카오 로그인"
      />
    </button>
  </div>
</template>

<style scoped></style>
