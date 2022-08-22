<template>
  <div class="wrapper">
    <div class="container d-flex flex-column justify-content-start align-items-center pt-5 vh-100">
      <div><i class="bi bi-chat-dots"></i></div>
      <h1 class="web-name mb-0 mx-2 text-center">yoyoChat</h1>
      <form class="p-3 userInfo col-10 col-md-6 col-lg-4" @submit.prevent="login">
        <h2 class="mb-4 text-center text-white">立即登入聊天</h2>
        <div class="mb-3">
          <label for="account" class="form-label w-100">
            <input
              type="email"
              class="form-control"
              id="account"
              name="account"
              aria-describedby="emailHelp"
              placeholder="信箱"
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
              placeholder="密碼"
              v-model="password"
          /></label>
        </div>
        <div class="d-flex justify-content-between">
          <router-link to="/register" class="link-light">快速註冊</router-link>
          <button type="submit" class="btn login-btn btn-outline-light">登入</button>
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
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/chat');
        })
        .catch((error) => {
          console.log(error.code, error.message);
          this.$swal({
            title: '錯誤?',
            text: '請確認帳號密碼是否輸入正確',
            icon: 'error',
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
.wrapper {
  width: 100%;
  overflow: auto;
  position: fixed;
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
