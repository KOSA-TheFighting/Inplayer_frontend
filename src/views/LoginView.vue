<script setup>

window.Kakao.init("8327d68228a934423bed1bd4436581fd");

// export default {
//   name: "LoginKakao",
//   methods: {
//     loginWithKakao() {
//       const params = {
//         redirectUri: "http://localhost:8280/oauth/kakao",
//       };
//       window.Kakao.Auth.authorize(params);
//     },
//   },
// };



const handleKakaoLogin = () => {

  const params = {
    redirectUri: "http://localhost:5173/oauth/kakao",
  };
  window.Kakao.Auth.authorize(params);
}
//
// const getKakaoAccount = ()  =>  async {
//   window.Kakao.API.request({
//     url: "/v2/user/me",
//     success: (res) => {
//       const kakao_account = res.kakao_account;
//       const ninkname = kakao_account.profile.ninkname;
//       const email = kakao_account.email;
//       console.log("ninkname", ninkname);
//       console.log("email", email);
//
//       //로그인처리구현
//
//       alert("로그인 성공!");
//     },
//     fail: (error) => {
//       console.log(error);
//     },
//   });
// },

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
