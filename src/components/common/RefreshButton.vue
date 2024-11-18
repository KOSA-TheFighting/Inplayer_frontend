<script setup>
import { ref } from 'vue'
import { useStreamStore } from '@/stores/stream'

const streamStore = useStreamStore()
const isSpinning = ref(false)

const refreshList = async () => {
  isSpinning.value = true
  await streamStore.fetchRecommendStreamers()
  // 애니메이션이 완료되는 시간과 맞추기 위해 타이머 설정
  setTimeout(() => {
    isSpinning.value = false
  }, 1000) // 1초 후 애니메이션 상태 해제
}
</script>

<template>
  <button
    class="refresh-button"
    @click="refreshList"
    :class="{ spinning: isSpinning }"
  >
    <span class="refresh-icon">↺</span>
  </button>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinning {
  animation: spin 1s linear;
  pointer-events: none; /* 애니메이션 중 클릭 방지 */
}

.refresh-button {
  background: transparent !important;
  border: none !important;
  padding: 4px 8px !important;
  margin: 0 !important;
  width: auto !important;
  color: #8b8282 !important;
  cursor: pointer;
}

.refresh-button:hover {
  transform: rotate(180deg);
  background: transparent !important;
  color: #ffffff !important;
}

.refresh-icon {
  font-size: 20px;
  display: block;
  transform: scaleX(-1);
}
</style>
