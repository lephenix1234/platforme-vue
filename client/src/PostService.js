const url = 'http://localhost:3000/api/posts/'
let axios = require('axios')

// let posts = await getPost()
class PostService {

  static async getPost() {
    try {
      let res = await axios.get(url)
      return res
    } catch (error) {
      return {
        err: 'il ya erreur 404'
      }
    }
  }

  static insertPost(data) {
    return axios.post(url, {
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password
    })
  }
  //DELETE
  static async sendInvit(id) {
    let posts = await axios.get(`${url}${id}`)
    return posts
  }
  //GET
}

export default PostService
