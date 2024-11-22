<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router/index.js';

// 상태 관리
const members = ref([]);
const selectedMember = ref(null);
const member_idToDeactivate = ref(null);
const currentPage = ref(1);  // 현재 페이지
const pageSize = ref(10);  // 한 페이지에 보여줄 항목 수
const totalPages = ref(1);  // 전체 페이지 수

// 회원 목록 조회
const getAllMembers = async () => {
  try {
    const response = await axios.get('/api/admin/members', {
      params: {
        page: currentPage.value - 1,  // 페이지 번호는 0부터 시작하는 경우가 많음
        size: pageSize.value
      }
    });
    members.value = response.data; // 서버에서 'content' 필드로 목록이 반환되는 경우
    totalPages.value = response.data.totalPages;  // 서버에서 'totalPages' 필드로 전체 페이지 수가 반환되는 경우
  } catch (error) {
    console.error('회원 정보 조회 오류:', error);
  }
};

// 특정 회원 정보 조회
const getMemberById = async (member_id) => {
  try {
    const response = await axios.get(`/api/admin/member/${member_id}`);
    selectedMember.value = response.data;
  } catch (error) {
    console.error('회원 정보 조회 오류:', error);
  }
};

// 회원 탈퇴 처리
const deactivateMember = async () => {
  try {
    await axios.put(`/api/admin/deactivate/${member_idToDeactivate.value}`);
    alert('회원 탈퇴가 완료되었습니다.');
    getAllMembers();  // 회원 리스트 갱신
  } catch (error) {
    console.error('회원 탈퇴 오류:', error);
  }
};

// 로그아웃 처리
const logout = () => {
  alert('로그아웃 되었습니다.');
  router.push({ name: 'home' });
};

// 페이지 변경 시 호출
const changePage = (page) => {
  currentPage.value = page;
  getAllMembers();
};

onMounted(async () => {
  await getAllMembers(); // 컴포넌트가 마운트될 때 모든 회원 조회
});
</script>

<template>
  <div class="admin-container">
    <h1>관리자 페이지</h1>
    <p>환영합니다, 관리자님!</p>

    <!-- 회원 목록 테이블 -->
    <div class="members-list">
      <h2>회원 목록</h2>
      <table>
        <thead>
        <tr>
          <th>회원 ID</th>
          <th>회원 이름</th>
          <th>가입 날짜</th>
          <th>팔로워 수</th>
          <th>상태</th>
          <th>탈퇴여부</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="member in members" :key="member.member_id">
          <td>{{ member.member_id }}</td>
          <td>{{ member.member_name }}</td>
          <td>{{ member.member_created_date }}</td>
          <td>{{ member.followerNum }}</td>
          <td>{{ member.member_delete_yn === 0 ? '활성화' : '탈퇴' }}</td>
          <td>
            <!-- 회원 탈퇴 버튼 -->
            <button @click="member_idToDeactivate = member.member_id">탈퇴 처리</button>
            <button @click="getMemberById(member.member_id)">회원 정보 보기</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">이전</button>
      <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">다음</button>
    </div>

    <!-- 선택한 회원 정보 조회 -->
    <div v-if="selectedMember" class="member-details">
      <h2>회원 정보</h2>
      <p>회원 ID: {{ selectedMember.member_id }}</p>
      <p>회원 이름: {{ selectedMember.member_name }}</p>
      <p>회원 이메일: {{ selectedMember.member_email }}</p>
      <p>가입 날짜: {{ selectedMember.member_created_date }}</p>
      <p>마지막 로그인: {{ selectedMember.member_last_login }}</p>
      <p>마지막 로그아웃: {{ selectedMember.member_last_logout }}</p>
      <p>팔로워 수: {{ selectedMember.followerNum }}</p>
    </div>

    <!-- 회원 탈퇴 버튼 -->
    <div v-if="member_idToDeactivate">
      <h3>회원 탈퇴</h3>
      <p>정말로 이 회원을 탈퇴 처리하시겠습니까?</p>
      <button @click="deactivateMember">탈퇴 처리</button>
      <button @click="member_idToDeactivate = null">취소</button>
    </div>

    <!-- 관리자 작업 버튼 -->
    <div class="admin-actions">
      <button @click="logout">로그아웃</button>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  text-align: center;
  padding: 40px;
  background-color: #1c1616;
  min-height: 100vh;
  color: #fdfdfd;
}

.members-list table {
  margin: 20px auto;
  width: 80%;
  border-collapse: collapse;
}

.members-list table th,
.members-list table td {
  padding: 10px;
  border: 1px solid #dff140;
}

.members-list table th {
  background-color: #8388bd;
}

.members-list table td {
  background-color: #222;
}

.members-list table button {
  margin: 5px;
  padding: 5px 10px;
  background-color: #dff140;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.members-list table button:hover {
  background-color: #8388bd;
}

.member-details {
  margin-top: 20px;
}

.admin-actions button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #76cf22;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.admin-actions button:hover {
  background-color: #c7d03b;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  margin: 0 10px;
  padding: 5px 10px;
  background-color: #ffffff;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-weight: bold;
  color: #fff;
}
</style>
