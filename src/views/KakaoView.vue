<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/api/requestAPI.js';
import { useMemberStore } from '@/stores/member';

const currentRoute = useRoute();
const memberStore = useMemberStore();

const nickname = ref(''); // 닉네임 입력 필드
const isNicknameSet = ref(false); // 닉네임 설정 완료 여부

// 카카오 인증 토큰 가져오기
const getKakaoToken = async (code) => {
  if (!code) {
    throw new Error('카카오 인증 실패');
  }
  try {
    const response = await api.get('/kakao/oauth/callback', { code });
    return response;
  } catch (error) {
    console.error('카카오 연동 실패:', error);
    throw new Error('카카오 연동 실패');
  }
};

// 닉네임 저장 처리
const saveNickname = async () => {
  if (!nickname.value.trim()) {
    alert('닉네임을 입력해주세요.');
    return;
  }

  try {
    // 서버에 닉네임 저장 요청
    await api.post('/members/nickname', { nickname: nickname.value });
    memberStore.nickname = nickname.value; // 상태 저장
    isNicknameSet.value = true; // 닉네임 설정 완료
    alert('닉네임이 저장되었습니다.');
  } catch (error) {
    console.error('닉네임 저장 실패:', error);
    alert('닉네임 저장에 실패했습니다.');
  }
};

onMounted(async () => {
  memberStore.kakaoCode = currentRoute.query.code; // 쿼리 파라미터에서 code 추출
  if (!memberStore.kakaoCode) {
    console.error('인증 코드가 없습니다.');
    return;
  }
  try {
    const token = await getKakaoToken(memberStore.kakaoCode);
    memberStore.login(token);

    // 닉네임이 이미 설정된 경우 확인
    if (memberStore.nickname) {
      isNicknameSet.value = true;
    }
  } catch (error) {
    console.error('로그인 처리 중 에러:', error);
  }
});
</script>

<template>
  <div>
    <div v-if="isNicknameSet">
      <p>안녕하세요, {{ memberStore.nickname }}님!</p>
    </div>
    <div v-else>
      <p>사용할 닉네임을 입력해주세요:</p>
      <input v-model="nickname" type="text" placeholder="닉네임을 입력하세요" />
      <button @click="saveNickname">닉네임 저장</button>
    </div>
  </div>
</template>

<style scoped>
input {
  padding: 5px;
  font-size: 16px;
  margin-right: 10px;
}

button {
  padding: 5px 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
