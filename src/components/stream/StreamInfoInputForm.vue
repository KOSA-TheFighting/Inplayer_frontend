<script setup>
import { useStreamStore } from '@/stores/stream'
import { ref } from 'vue'

import talkImg from '@/assets/talk.png'
import studyImg from '@/assets/study.png'
import musicImg from '@/assets/music.png'
import artImg from '@/assets/art.png'
import gameImg from '@/assets/game.png'
import etcImg from '@/assets/etc.png'

const streamStore = useStreamStore()

const streamInfo = ref({
  stream_title: '',
  streamtag_num: '',
  streamtag_name: '',
  stream_description: '',
})

const errors = ref({
  title: '',
  category: '',
  description: '',
})

// 카테고리 정보
const defaultCategories = [
  { id: '2000', name: 'talk', thumbnail: talkImg },
  { id: '2001', name: 'study', thumbnail: studyImg },
  { id: '2002', name: 'music', thumbnail: musicImg },
  { id: '2003', name: 'art', thumbnail: artImg },
  { id: '2004', name: 'game', thumbnail: gameImg },
  { id: '2005', name: 'etc', thumbnail: etcImg },
]

// 카테고리 선택 핸들러 추가
const handleCategoryChange = categoryName => {
  const selectedCategory = defaultCategories.find(
    cat => cat.name === categoryName,
  )
  if (selectedCategory) {
    streamInfo.value.streamtag_num = selectedCategory.id
    streamInfo.value.streamtag_name = categoryName
  }
}

// 폼 유효성 검사
const validateForm = () => {
  let isValid = true

  // 제목 검사
  if (!streamInfo.value.stream_title?.trim()) {
    errors.value.title = '방송 제목을 입력해주세요'
    isValid = false
  } else {
    errors.value.title = ''
  }

  // 카테고리 검사
  if (!streamInfo.value.streamtag_name) {
    errors.value.category = '카테고리를 선택해주세요'
    isValid = false
  } else {
    errors.value.category = ''
  }

  // 설명 검사
  if (!streamInfo.value.stream_description?.trim()) {
    errors.value.description = '방송 설명을 입력해주세요'
    isValid = false
  } else {
    errors.value.description = ''
  }

  return isValid
}

// 업데이트 핸들러
const handleUpdate = () => {
  if (validateForm()) {
    streamStore.currentStream = { ...streamInfo.value }
    alert('방송 정보가 업데이트되었습니다.')
  }
}
</script>

<template>
  <!-- 방송 준비 폼 -->
  <div class="stream-prep-form">
    <div class="form-group">
      <label for="title">방송 제목</label>
      <input
        type="text"
        id="title"
        v-model="streamInfo.stream_title"
        placeholder="방송 제목을 입력하세요"
      />
      <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
    </div>

    <div class="form-group">
      <label for="category">방송 카테고리</label>
      <select
        id="category"
        v-model="streamInfo.streamtag_name"
        @change="handleCategoryChange(streamInfo.streamtag_name)"
        class="category-select"
      >
        <option value="" disabled selected>카테고리를 선택하세요</option>
        <option
          v-for="category in defaultCategories"
          :key="category.id"
          :value="category.name"
        >
          {{ category.name.toUpperCase() }}
        </option>
      </select>
      <span v-if="errors.category" class="error-message">{{
        errors.category
      }}</span>
    </div>

    <div class="form-group">
      <label for="description">방송 설명</label>
      <textarea
        id="description"
        v-model="streamInfo.stream_description"
        placeholder="방송 설명을 입력하세요"
        rows="3"
      ></textarea>
      <span v-if="errors.description" class="error-message">{{
        errors.description
      }}</span>
    </div>

    <button @click="handleUpdate" class="update-button">업데이트</button>
  </div>
</template>

<style scoped>
.stream-prep-form {
  width: 50%;
  grid-column: 1 / -1;
  background-color: #272626;
  padding: 20px;
  margin-top: 10px;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
  position: relative;
}

.form-group label {
  display: block;
  color: #ffffff;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 80%;
  padding: 10px;
  border: 1px solid #5c5757;
  border-radius: 5px;
  background-color: #5c5757;
  color: #ffffff;
  font-size: 16px;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #a0a0a0;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #4caf50;
}

.category-select {
  appearance: none;
  cursor: pointer;
  width: 83% !important;
}

.error-message {
  color: #ff4444;
  font-size: 14px;
  margin-top: 5px;
  display: block;
}

.update-button {
  padding: 12px 24px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
  width: 83%;
}

.update-button:hover {
  background-color: #388e3c;
}
</style>
