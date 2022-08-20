<template>
  <div class="wrapper">
    <div class="container  d-flex flex-column justify-content-center align-items-center vh-100">
      <div><i class="bi bi-chat-dots"></i></div>
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

<style lang="scss" scoped>
.wrapper {
  background:linear-gradient(65deg, rgb(247, 148, 67), rgb(77, 28, 213));
}
.bi-chat-dots{
  color: #fff;
  font-size: 6rem;
}

</style>
