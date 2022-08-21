<template>
  <div class="wrapper">
    <div class="container d-flex flex-column justify-content-start align-items-center pt-5 vh-100">
      <div><i class="bi bi-chat-dots"></i></div>
      <h1 class="web-name mb-0 mx-2 text-center">yoyoChat</h1>
      <form class="p-3 userInfo col-10 col-md-6 col-lg-4" @submit.prevent="formCheck">
        <h2 class="mb-4 text-center text-white">快速註冊</h2>
        <div class="mb-3">
          <label for="account" class="form-label w-100">
            <input
              type="email"
              class="form-control"
              id="account"
              name="account"
              aria-describedby="emailHelp"
              placeholder="Email"
              v-model="email"
            />
          </label>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label w-100">
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              placeholder="請輸入密碼"
              v-model="password"
          /></label>
        </div>
        <div class="mb-3">
          <label for="password2" class="form-label w-100">
            <input
              type="password"
              class="form-control"
              id="password2"
              name="password2"
              placeholder="再次輸入密碼"
              v-model="password2"
          /></label>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label w-100">
            <input
              type="text"
              class="form-control"
              id="nickname"
              name="nickname"
              placeholder="暱稱"
              v-model="nickname"
          /></label>
        </div>
        <div class="d-flex justify-content-between">
          <router-link to="/" class="link-light">返回登入頁</router-link>
          <button type="submit" class="btn login-btn btn-outline-light">註冊</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      password2: '',
      nickname: '',
    };
  },
  methods: {
    regster() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          const user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: this.nickname,
          })
            .then(() => {
              this.$swal('帳號建立完成').then(() => {
                this.$router.push('/chat');
              });
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formCheck() {
      if (this.email === '') {
        this.$swal('Email欄位不得為空');
      } else if (
        this.email.search(/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/) === -1
      ) {
        this.$swal('Email格式錯誤!');
      } else if ((this.password || this.password2) === '') {
        this.$swal('密碼欄位不得為空!');
      } else if (this.password !== this.password2) {
        this.$swal('密碼兩次輸入不相同!');
      } else if (this.nickname === '') {
        this.$swal('暱稱欄位不得為空!');
      } else {
        this.regster();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  background: linear-gradient(55deg, rgb(67, 247, 226), rgb(90, 28, 213));
}
.web-name {
  font-family: 'Dancing Script', cursive;
  line-height: 2;
  color: #fff;
}
.bi-chat-dots {
  color: #fff;
  font-size: 6rem;
}
</style>
