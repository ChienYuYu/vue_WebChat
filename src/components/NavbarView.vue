<template>
 <header class="header p-2">
    <div class="container d-flex justify-content-between">
      <div class="d-flex align-items-center">
      <h1 class="web-name mb-0 text-center">yoyoChat</h1>
      <i class="bi bi-chat-dots"></i>
    </div>
    <button type="button" class="btn btn-sm logout-btn" @click="logout">
      登出
    </button>
    </div>
  </header>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$swal('登出成功');
        })
        .catch(() => {
          this.$swal('似乎有些問題 請稍後再嘗試');
        });
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  background: linear-gradient(55deg, rgb(67, 247, 226), rgb(90, 28, 213));
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 20;
  .web-name {
    font-size: 20px;
    font-family: 'Dancing Script', cursive;
    line-height: 2;
  }
  .logout-btn {
    // background: rgb(56, 172, 185);
    border: 1px solid #ccc;
    color: #eee;
  }
}
</style>
