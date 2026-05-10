import axios from 'axios'

export default class GenericEntity {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  async get(path = '') {
    const { data } = await axios.get(`${this.baseURL}${path}`)
    Object.assign(this, data)
    return this
  }

  async post(path = '', body) {
    const { data } = await axios.post(`${this.baseURL}${path}`, body)
    Object.assign(this, data)
    return this
  }

  async put(path = '', body) {
    const { data } = await axios.put(`${this.baseURL}${path}`, body)
    Object.assign(this, data)
    return this
  }

  async patch(path = '', body) {
    const { data } = await axios.patch(`${this.baseURL}${path}`, body)
    Object.assign(this, data)
    return this
  }

  async delete(path = '') {
    const { data } = await axios.delete(`${this.baseURL}${path}`)
    Object.assign(this, data)
    return this
  }
}
