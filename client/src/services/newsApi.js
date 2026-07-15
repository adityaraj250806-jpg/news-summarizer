import axios from 'axios'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const BASE_URL = 'https://newsapi.org/v2'

const newsApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
    language: 'en',
    pageSize: 20,
  },
})

export async function getTopHeadlines(category = 'general') {
  const response = await newsApi.get('/top-headlines', {
    params: { category },
  })
  return response.data.articles
}

export async function searchNews(query) {
  const response = await newsApi.get('/everything', {
    params: {
      q: query,
      sortBy: 'publishedAt',
    },
  })
  return response.data.articles
}
