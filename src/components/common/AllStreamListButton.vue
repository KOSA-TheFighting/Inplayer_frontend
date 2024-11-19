<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// 페이지 이동 함수
const goToAllChannelsPage = () => {
  router.push({ name: 'list' }) // 'ListView'는 라우터에 설정된 이름
}
</script>

<template>
  <!-- 우측 상단에 배치할 버튼 -->
  <button class="go-to-all-channels" @click="goToAllChannelsPage">
    전체 방송목록으로 이동
  </button>
</template>

<style scoped>
/* 우측 하단 버튼 스타일 */
.go-to-all-channels {
  position: relative;
  top: -10px;
  left: 1160px;
  padding: 10px 10px;
  background-color: #f0a500;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}
/* 호버 시 효과 */
.go-to-all-channels:hover {
  background: linear-gradient(135deg, #84d61f, #008cf0); /* 호버 시 색상 변화 */
  transform: scale(1.05); /* 크기 확대 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* 그림자 강도 증가 */
}

/* 클릭 시 효과 */
.go-to-all-channels:active {
  transform: scale(0.98); /* 클릭 시 살짝 눌리는 효과 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 클릭 시 그림자 효과 변경 */
}

/* 포커스 시 효과 */
.go-to-all-channels:focus {
  outline: none; /* 기본 포커스 아웃라인 제거 */
  box-shadow: 0 0 8px rgba(255, 165, 0, 0.7); /* 포커스 시 밝은 색으로 아웃라인 추가 */
}
</style>
