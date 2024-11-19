<script setup>
import AllStreamListButton from '@/components/common/AllStreamListButton.vue'
import { useMemberStore } from '@/stores/member'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
//import { useRouter } from 'vue-router';

//const router = useRouter();
const replayVideos = ref([])
const route = useRoute()
const memberStore = useMemberStore()
const member_id = route.params.member_id

const loadReplayVideos = () => {
  // 더미 데이터 생성
  replayVideos.value = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Replay Video ${i + 1}`,
    thumbnail: 'https://via.placeholder.com/150', // 샘플 썸네일 이미지
  }))
}

onMounted(async () => {
  await memberStore.getMemberInfo(member_id)
  loadReplayVideos()
})
</script>

<template>
  <div class="main-container">
    <main class="content">
      <!-- 우측 하단에 배치할 버튼 -->
      <h1>MY 채널</h1>
      <AllStreamListButton />

      <section v-if="memberStore.memberInfo" class="user-info-display">
        <h2>채널 정보</h2>
        <h3>{{ memberStore.memberInfo.member_nickname }}</h3>
        <div class="profile">
          <h4>프로필 이미지</h4>
          <img
            src="https://via.placeholder.com/150"
            alt="User Profile Picture"
            class="profile-picture"
          />
          <br /><br />
          <span>팔로워 수 : {{ memberStore.memberInfo.followerNum }}명</span>
        </div>
        <div class="broadcast-info">
          <h4>가입일</h4>
          <span>{{ memberStore.memberInfo.member_created_date }}</span>
        </div>
      </section>

      <section class="replay-videos">
        <h1>영상 다시보기 목록</h1>
        <div class="video-list">
          <div v-for="video in replayVideos" :key="video.id" class="video-card">
            <img :src="video.thumbnail" alt="Video thumbnail" />
            <h2>{{ video.name }}</h2>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex: 1;
  justify-content: center; /* 내용 중앙 정렬 */
}

.content h1 {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 40px;
  padding: 20px;
  color: #ffffff;
  background-color: #2d2d2d;
  gap: 30px; /* 세션 간 간격 */
}

.user-info-display .broadcast-info {
  margin-top: 20px;
}

.user-info-display .broadcast-info h4 {
  font-weight: bold;
  margin-bottom: 5px;
}

.user-info-display .broadcast-info span {
  color: #ffffff;
}

.user-info-display,
.replay-videos {
  background-color: #444;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.user-info-display h1,
.replay-videos h1 {
  color: #ffffff;
  text-align: left;
  margin-bottom: 10px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.profile h4 {
  color: #fff;
}

.replay-videos h1 {
  font-size: 22px;
}

.video-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.video-card {
  background-color: #333;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  width: 180px;
}

.video-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.video-card h2 {
  color: #ffffff;
  font-size: 16px;
  margin-top: 10px;
}
</style>
