<template>
    <div>
        <div>
          <p v-if="err">Erreur lors du chargement des donnees</p>
            <form>
              <input type="text" v-model="firstname" placeholder="nom">
              <input type="text" v-model="lastname" placeholder="prenom">
              <input type="password" v-model="password" placeholder="password">
              <button @click.prevent="add" >Enregistrer</button>
            </form>
        </div>
        <div v-for="user in users" :key="user._id">
          <ul>{{user.firstname}}<span style="margin:1em"></span>
          <button v-if="user.message" disabled>
              message deja envoyé
          </button>
          <button v-if="!user.message" @click.prevent="send(user._id)">envoyer une invitation</button>
          </ul>
        </div>
    </div>
</template>

<script>
import PostService from "../PostService";
export default {
  name: "",
  data() {
    return {
      users: [],
      firstname: "",
      lastname: "",
      password: "",
      err: ""
    };
  },
  methods: {
    async add() {
      await PostService.insertPost({
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password
      });
      let res = await PostService.getPost();
      this.users = res.data;
      this.firstname = null;
      this.lastname = null;
      this.password = null;
    },
    async send(id) {
      await PostService.sendInvit(id);
      let res = await PostService.getPost();
      this.users = res.data;
      console.log(id);
    }
  },
  async created() {
    let res = await PostService.getPost();
    this.users = res.data;
    this.err = res.err;
  }
};
</script>

<style>
</style>