<template>
  <header class="header p-2">
    <div class="d-flex align-items-center">
      <h1 class="web-name mb-0 mx-2 text-center">yoyoChat</h1>
      <i class="bi bi-chat-dots"></i>
    </div>
    <button type="button" class="btn btn-sm logout-btn" @click="logout">登出</button>
  </header>
  <div class="wrapper d-flex justify-content-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="chat-area col-12 col-md-10 col-xl-4">
          <ul class="msg-list list-unstyled pt-4 pb-5 py-md-4 py-lg-3">
            <li class="msg mb-3">
              <span class="nickname mb-1 text-nowrap w-100 d-block text-start pt-1"
                >台南基努李維</span
              >
              <p class="p-2">hello 你好</p>
            </li>

            <li class="my-msg mb-3">
              <span class="nickname mb-1 text-nowrap w-100 d-block text-end pt-1">新北金城武</span>
              <p class="p-2">我就是帥</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="input-msg-area col-12 col-lg-5 mb-lg-4 shadow-sm">
      <div class="input-group">
        <input
          type="text"
          class="text-input form-control border-0 rounded-0"
          placeholder="輸入訊息..."
          aria-label="text"
        />
        <button class="submit-btn btn py-2 rounded-0" type="button">
          <i class="bi bi-send-fill p-2"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data() {
    return {
      uid: '',
      nickname: '',
      time: '',
    };
  },
  methods: {
    getUserData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log(user);
          this.uid = user.uid;
          this.nickname = user.displayName;
        } else {
          this.$router.push('/');
        }
      });
    },
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
  created() {
    this.getUserData();
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
.header {
  width: 100%;
  height: 45px;
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
.wrapper {
  background: linear-gradient(55deg, rgb(22, 22, 22), rgb(35, 35, 35));
  min-height: 100vh;
}

.chat-area {
  position: fixed;
  height: 85vh;
  border-radius: 20px;
  background: linear-gradient(55deg, rgb(67, 247, 226), rgb(90, 28, 213));
  border: 5px solid rgb(151, 231, 255);
  overflow: auto;
  margin-top: 60px;
  @media (max-width: 900px) {
    margin-top: 80px;
    overflow: auto;
  }
  @media (max-width: 430px) {
    height: 100%;
    border-radius: 0;
    border: none;
    margin-top: 40px;
  }
}

.msg-list {
  display: flex;
  flex-direction: column;
}
.nickname {
  color: rgb(245, 255, 168);
  width: 33%;
  font-weight: bolder;
  font-size: 14px;
}
.msg,
.my-msg {
  max-width: 70%;
}
.msg-list .msg {
  align-self: start;
  p {
    background: #333;
    color: #fff;
    border-radius: 10px;
    display: inline-block;
  }
}

.msg-list .my-msg {
  align-self: end;
  display: flex;
  flex-direction: column;
  p {
    background: rgb(255, 255, 255);
    border-radius: 10px;
    display: inline-block;
    align-self: end;
  }
}

.input-msg-area {
  position: fixed;
  bottom: 0;
  .text-input:focus {
    box-shadow: none;
    outline: none;
  }

  .submit-btn {
    background: rgb(227, 70, 156);
    color: #fff;
    &:hover {
      background: rgb(250, 114, 189);
      color: #fff;
    }
    &:focus {
      box-shadow: none;
      outline: none;
    }
  }
}
</style>
