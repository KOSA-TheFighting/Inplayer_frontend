<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
import { api } from '@/api/requestAPI.js'


const currentRoute = useRoute();
const code = currentRoute.query.code;
console.log("currentRoute = " , currentRoute);
console.log("code = " , code);

alert("code1: " + code)

const getKakaoToken = async (code) => {
  alert(code)
    const result = await api.get('/kakao/oauth/callback', {code:code});
    return result;
  };

getKakaoToken(code)
</script>

<template>

</template>

<style scoped>

</style>
