import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/news'

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
