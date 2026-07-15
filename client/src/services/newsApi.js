import axios from 'axios'
import { API_URL } from '../config'

const BASE_URL = `${API_URL}/api/news`

const newsApi = axios.create({
  baseURL: BASE_URL,
})

export async function getTopHeadlines(category = 'general') {
  const response = await newsApi.get('/top-headlines', {
    params: { category },
  })
  return response.data.articles
}

export async function searchNews(query) {
  const response = await newsApi.get('/everything', {
    params: { q: query },
  })
  return response.data.articles
}
