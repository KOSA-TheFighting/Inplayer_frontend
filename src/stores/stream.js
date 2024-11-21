import { api } from '@/api/requestAPI'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStreamStore = defineStore('stream', () => {
  const streams = ref([])
  const allStreams = ref([])
  const recommendStreams = ref([])
  const recommendStreamers = ref([])
  const searchResults = ref([])
  const currentPage = ref(1)
  const size = ref(30)
  const loading = ref(false)
  const hasMore = ref(true)
  const sortBy = ref('recommendation')
  const error = ref(null)

  //전체 방송 목록 가져오기(무한 스크롤)
  const fetchChannels = async (params = {}, $state) => {
    //모든 데이터를 불러왔거나 현재 데이터 로딩 중인 상태라면 추가 요청을 보내지 않도록 함
    if (!hasMore.value || loading.value) return

    loading.value = true
    try {
      if (params.currentPage) currentPage.value = params.currentPage
      if (params.size) size.value = params.size

      const response = await api.get('/stream/list', {
        page: currentPage.value,
        size: size.value,
        sortBy: sortBy.value,
      })

      if (response.pageResponse.list.length) {
        streams.value.push(...response.pageResponse.list)
        currentPage.value++
        //$state?.loaded()
      } else {
        hasMore.value = false
        $state?.complete()
      }
    } catch (error) {
      console.error('방송 목록 조회 실패:', error)
      $state?.error()
    } finally {
      loading.value = false
    }
  }

  //정렬 옵션 바꾸기
  const changeSortOption = async newSortBy => {
    sortBy.value = newSortBy
    streams.value = []
    currentPage.value = 1
    hasMore.value = true
  }

  //메인뷰 추천 방송 목록 가져오기
  const fetchRecommendChannels = async (params = {}) => {
    loading.value = true
    try {
      const response = await api.get('/stream/list', {
        //page: params.page,
        size: params.size,
        sortBy: params.sortBy,
      })

      recommendStreams.value = response.pageResponse.list
    } catch (error) {
      console.error('방송 목록 조회 실패:', error)
    } finally {
      loading.value = false
    }
  }

  //사이드바 추천 스트리머 목록 가져오기
  const fetchRecommendStreamers = async () => {
    loading.value = true
    try {
      const response = await api.get('/stream/list', {
        size: 5,
        sortBy: 'newest',
      })

      recommendStreamers.value = response.pageResponse.list
    } catch (error) {
      console.error('방송 목록 조회 실패:', error)
    } finally {
      loading.value = false
    }
  }

  //카테고리용 방송 목록 가져오기
  const fetchAllChannels = async () => {
    loading.value = true
    try {
      const response = await api.get('/stream/list', {
        size: 1000,
        sortBy: 'recommendation',
      })

      allStreams.value = response.pageResponse.list
    } catch (error) {
      console.error('방송 목록 조회 실패:', error)
    } finally {
      loading.value = false
    }
  }

  //검색결과 가져오기
  const performSearch = async (params = {}) => {
    loading.value = true
    try {
      const response = await api.get('/stream/list', {
        size: 20,
        sortBy: 'recommendation',
        search: params,
      })

      searchResults.value = response.pageResponse.list
    } catch (error) {
      console.error('방송 목록 조회 실패:', error)
    } finally {
      loading.value = false
    }
  }

  // const listStreams = async params => {
  //   loading.value = true
  //   error.value = null
  //   try {
  //     const response = await api.get('/stream/list', params)
  //     streams.value = response.pageResponse.list

  //     return response
  //   } catch (e) {
  //     error.value = e.message
  //     throw e
  //   } finally {
  //     loading.value = false
  //   }
  // }

  return {
    streams,
    allStreams,
    recommendStreams,
    recommendStreamers,
    searchResults,
    currentPage,
    size,
    loading,
    hasMore,
    sortBy,
    error,
    fetchChannels,
    changeSortOption,
    fetchRecommendChannels,
    fetchRecommendStreamers,
    fetchAllChannels,
    performSearch,
    // listStreams,
  }
})
