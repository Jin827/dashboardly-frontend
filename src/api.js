import superagent from 'superagent'
import { API_HOST } from './config'

class Api {

  requestSignup = (email, password) => (

    superagent
    .post(`${API_HOST}/auth/users`)
    .send({email, password})
  )


  requestLogin = (email, password) => (
    superagent
    .post(`${API_HOST}/auth/sessions`)
    .send({ email, password })
  )

  requestLogout = (token) => (
    superagent
    .delete(`${API_HOST}/auth/sessions`)
    .set('Authorization', `token ${token}`)
  )

  getBoardsList = (page, count) => (
    superagent
    .get(`${API_HOST}/boards`)
  )

  getBoard = (id) => (
    superagent
    .get(`${API_HOST}/boards/${id}`)
  )

  createBoards = (title, description, token) => (
    superagent
    .post(`${API_HOST}/boards`)
    .set('Authorization', `token ${token}`)
    .send({title,description})
  )

  getBookmarks = (boardId) => (
    superagent
    .get(`${API_HOST}/boards/${boardId}/bookmarks`)
  )

  createBookmarks = (boardId, title, url , description , token) => (
    superagent
    .post(`${API_HOST}/boards/${boardId}/bookmarks`)
    .set('Authorization', `token ${token}`)
    .send({title,description,url})
  )

  getMe = (token) => (
    superagent
    .get(`${API_HOST}/auth/me`)
  )

}

export default new Api();
