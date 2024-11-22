<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const announcementId = route.params.id;

// 샘플 데이터로 상세 내용을 표시
const announcements = [
  {
    id: 1,
    title: '서비스 약관 변경 안내',
    content: `2024년 12월 1일부터 서비스 약관이 다음과 같이 변경됩니다.
  본 약관 변경은 사용자에게 보다 나은 서비스를 제공하기 위하여 이루어집니다.
  주요 변경 사항은 다음과 같습니다:
  1. 개인정보 처리방침의 변경
  2. 서비스 제공의 조건 변경
  3. 유료 서비스 관련 결제 시스템 개선
  변경된 약관은 2024년 12월 1일부터 적용되며, 이에 동의하지 않으실 경우 서비스 이용에 제한이 있을 수 있습니다.`,
    date: '2024-11-20',
  },
  {
    id: 2,
    title: '시스템 점검 안내',
    content: `2024년 11월 25일 오전 2시부터 4시까지 시스템 점검이 진행됩니다.
  이 점검은 서버 업그레이드와 보안 강화를 위해 필요한 작업입니다.
  점검 동안에는 모든 서비스 이용이 일시 중지되며, 점검이 완료되는 대로 서비스가 정상적으로 재개됩니다.
  사용자 여러분께서는 점검 시간 동안 서비스를 이용할 수 없음을 양해 부탁드립니다.
  점검 후 서비스의 안정성과 보안성이 한층 강화될 예정입니다.`,
    date: '2024-11-18',
  },
  {
    id: 3,
    title: '새로운 기능 업데이트',
    content: `회원들이 요청한 새로운 방송 도구가 추가되었습니다.
  이제 방송 중에 실시간 댓글 기능, 퀴즈 기능, 시청자 투표 기능을 사용할 수 있습니다.
  또한, 방송 내 화면 공유 기능이 개선되어 더 나은 방송 경험을 제공합니다.
  이 외에도 여러 편의 기능이 추가되었으므로, 사용자가 보다 쉽게 방송을 즐기고, 참여할 수 있습니다.
  업데이트된 기능은 2024년 11월 15일부터 적용되며, 바로 사용 가능합니다.`,
    date: '2024-11-15',
  },
  {
    id: 4,
    title: '블랙 프라이데이 할인 이벤트',
    content: `2024년 11월 24일부터 11월 30일까지 특별 할인 이벤트가 진행됩니다.
  이 기간 동안, 유료 방송 서비스와 프리미엄 구독 서비스에 대해 최대 50% 할인이 제공됩니다.
  또한, 구매 금액에 따라 추가 혜택도 제공되며, 다양한 기프트 카드와 경품도 준비되어 있습니다.
  할인 혜택은 웹사이트와 모바일 앱에서 모두 적용되며, 사전 등록한 사용자에게는 추가 쿠폰이 제공됩니다.
  이벤트 기간 동안 많은 관심 부탁드립니다.`,
    date: '2024-11-19',
  },
  {
    id: 5,
    title: '이용자 보안 강화 정책',
    content: `2024년 12월부터 2단계 인증이 의무화됩니다.
  모든 사용자 계정에 대해 보안을 강화하기 위한 조치로, 2단계 인증 절차를 거쳐야만 계정에 접근할 수 있습니다.
  2단계 인증은 휴대폰 번호나 이메일을 통해 인증 코드를 입력하는 방식으로 진행됩니다.
  이 기능은 사용자의 개인정보 보호와 계정 보안을 높이는 데 중요한 역할을 하며, 이를 통해 부정 로그인과 해킹을 방지할 수 있습니다.
  사용자분들께서는 2024년 12월부터 반드시 2단계 인증을 설정해 주시기 바랍니다.`,
    date: '2024-11-12',
  },
  {
    id: 6,
    title: '새로운 방송 기능 테스트 안내',
    content: '2024년 11월 22일부터 방송 도구에 대한 테스트가 진행됩니다. 이번 테스트는 새로운 방송 기능을 실제로 이용할 수 있는 기회를 제공합니다. 테스트 항목으로는 실시간 화면 전환, 오디오 믹싱, 그리고 영상 편집 도구의 사용자 인터페이스(UI)가 포함됩니다. 사용자는 기능을 테스트한 후 피드백을 제출할 수 있으며, 이를 통해 향후 서비스 개선에 기여할 수 있습니다. 테스트는 한정된 기간 동안 진행되며, 참여자에게는 특별 보상도 제공됩니다.',
    date: '2024-11-12',
  },

];

const announcement = announcements.find((a) => a.id === Number(announcementId));
</script>

<template>
  <div class="announcement-detail">
    <h1><{{ announcement.title }}></h1>
    <p>{{ announcement.content }}</p>
    <span class="date">작성 날짜 : {{ announcement.date }}</span>
    <button @click="$router.back()">목록으로 돌아가기</button>
  </div>
</template>

<style scoped>
/* 배경 및 중앙 정렬 */
.announcement-detail {
  display: flex;
  justify-content: center;
  align-items: center;  /* 세로로도 중앙 정렬 */
  background-color: #333; /* 배경색 추가 */
  padding: 20px;
 /* min-height: 100vh; /* 화면 전체를 채우도록 설정 */
}

/* 공지사항 내용 영역 */
.announcement-detail {
  width: 100%;
  max-width: 900px;
  background-color: #444; /* 내용 배경색 */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column; /* 세로 레이아웃으로 변경 */
  gap: 40px; /* 각 요소 간 간격 설정 */
}

/* 제목 스타일 */
.announcement-detail h1 {
  font-size: 32px;
  color: #f0a500;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left;
  border-bottom: 2px solid #f0a500; /* 제목 하단에 선 추가 */
  padding-bottom: 10px;
}

/* 본문 내용 스타일 */
.announcement-detail p {
  font-size: 25px;
  color: #fdfdfd;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
}

/* 날짜 스타일 */
.date {
  font-size: 14px;
  color: #fdfdfd;
  text-align: left;
  font-style: italic;
  margin-top: 10px;
}

/* 돌아가기 버튼 스타일 */
button {
  background-color: #f0a500;
  color: #1c1616;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 20%;
  align-self: center; /* 버튼을 중앙 정렬 */
  padding: 10px 0;
  margin-top: 20px;
}

button:hover {
  background-color: #d48700;
}

button:focus {
  outline: none;
}
</style>
