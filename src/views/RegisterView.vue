<template>
  <div class="wrapper">
    <div class="container  d-flex flex-column justify-content-start align-items-center pt-5 vh-100">
      <div><i class="bi bi-chat-dots"></i></div>
      <h1 class="web-name mb-0 mx-2 text-center">yoyoChat</h1>
      <form class="p-3 userInfo col-10 col-md-6 col-lg-4" @submit.prevent="login">
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
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn login-btn btn-outline-light">註冊</button>
          </div>
        </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  background:linear-gradient(55deg, rgb(67, 247, 226), rgb(90, 28, 213));
}
.web-name {
  font-family: 'Dancing Script', cursive;
  line-height: 2;
  color: #fff;
}
.bi-chat-dots{
  color: #fff;
  font-size: 6rem;
}

</style>
