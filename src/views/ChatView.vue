<template>
  <Navbar></Navbar>
  <!-- --------------------------------- -->
  <div class="wrapper background">
    <div class="container chat-wrap">
      <div class="col-6 chat-area" ref="chatArea">
        <ul class="list-unstyled" v-for="(item, index) in allMessages" :key="index">
          <li v-if="item.retract === true" class="retract-message">
              <p class="p-1">
              // {{item.nickname}} {{ item.userMessage }} //
              </p>
          </li>
          <li class="message" v-else-if="item.uid !== uid">
            <span class="nickname">{{ item.nickname }}</span>
            <p class="p-1">{{ item.userMessage }}</p>
            <span class="time">
              {{ item.time }}
            </span>
          </li>
          <li class="my-message" v-else-if="item.uid == uid">
            <span class="nickname">{{ item.nickname }}</span>
            <p class="p-1">
              {{ item.userMessage }}
            </p>
            <div>
              <a href="#" class="retract-btn bi bi-arrow-up-right-square"
              :data-key="index" @click.prevent="retractMsg">
                收回 /
              </a>
              <span class="time">
                {{ item.time }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- --------------------------------- -->
  <div class="input-area-wrap">
    <div class="input-group input-area">
      <input
        type="text"
        class="text-input form-control border-0 rounded-0"
        placeholder="輸入訊息..."
        aria-label="text"
        v-model="myMessage"
        @keyup.enter="sendMessage"
      />
      <button class="submit-btn btn py-2 rounded-0" type="button" @click="sendMessage">
        <i class="bi bi-send-fill p-2"></i>
      </button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { nextTick } from 'vue';
import Navbar from '../components/NavbarView.vue';

export default {
  components: { Navbar },
  data() {
    return {
      uid: '',
      nickname: '',
      allMessages: '',
      date: '',
      time: '',
      myMessage: '',
      datakey: '',
      retractStatus: false,
    };
  },
  methods: {
    getUserData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.uid = user.uid;
          this.nickname = user.displayName;
        } else {
          this.$router.push('/');
        }
      });
    },
    sendMessage() {
      this.getTime();
      const msgData = firebase.database().ref('messages');
      msgData.push({
        uid: this.uid,
        nickname: this.nickname,
        userMessage: this.myMessage,
        date: this.date,
        time: this.time,
        retract: false,
      });
      this.myMessage = '';
    },
    retractMsg(e) {
      this.getTime();
      this.datakey = e.target.dataset.key;
      const msgData = firebase.database().ref('messages').child(this.datakey);
      msgData.set({
        uid: this.uid,
        nickname: this.nickname,
        userMessage: '已收回訊息',
        date: this.date,
        retract: true,
      });
      this.retractStatus = true;
    },
    getTime() {
      const nowTime = new Date();
      this.date = `${nowTime.getTime()}`;
      this.time = `${nowTime.getHours()}:${nowTime.getMinutes()}`;
    },
    awaysBottom() {
      nextTick(() => {
        const getHeight = this.$refs.chatArea.scrollHeight;
        this.$refs.chatArea.scrollTop = getHeight;
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
  mounted() {
    firebase
      .database()
      .ref('messages')
      .on('value', (snapshot) => {
        this.allMessages = snapshot.val();
        this.awaysBottom();
      });
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}

.wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #333;
  padding-top: 50px; // 抵銷navbar高度
  @media (min-width: 768px) {
    padding-top: 30px; // 平板橫式 筆電
  }
}

.chat-wrap {
  height: 100%;
  padding-top: 10px;
  padding-bottom: 20px; //稍微抵銷各廠牌手機瀏覽器內建bar高度 (無解的難題)
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(55deg, rgb(67, 247, 226), rgb(90, 28, 213));
  background-attachment: fixed;
  @media (min-width: 768px) {
    width: 70%;
    height: 75%;
    margin-top: 50px;
  }
  .chat-area {
    // border: 1px solid #333;
    padding-bottom: 100px; // 防吃字
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  .chat-area ul {
    display: flex;
    flex-direction: column;
    .nickname {
      color: rgb(245, 255, 168);
      font-weight: bolder;
      font-size: 14px;
      display: block;
    }
    .retract-message{
      width: 100%;
      text-align: center;
      p {
        display: inline-block;
        background: rgb(114, 187, 230);
        color: #fff;
        font-size: 13px;
        border-radius: 5px;
        margin-bottom: 0;
      }
    }
    .message {
      width: 70%;
      p {
        background: #333;
        color: #fff;
        border-radius: 5px;
        display: inline-block;
        margin-bottom: 0;
        word-break: break-all;
      }
    }
    .my-message {
      width: 70%;
      align-self: end;
      text-align: end;
      p {
        text-align: start;
        display: inline-block;
        background: #fff;
        border-radius: 5px;
        margin-bottom: 0;
        word-break: break-all;
      }
      .retract-btn{
        // display: block;
        color: rgb(255, 228, 253);
        border-radius: 10%;
        font-size: 13px;
        text-decoration: none;
      }
    }
    .time {
      color: #eee;
      // display: block;
      font-size: 14px;
    }
  }
}

.input-area-wrap {
  display: flex;
  justify-content: center;
  .input-area {
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 10;
    @media (min-width: 992px) {
      width: 70%;
    }
    .text-input {
      &:focus {
        box-shadow: none;
        outline: none;
      }
    }
    .submit-btn {
      background: rgb(227, 70, 156);
      color: #fff;
      &:focus {
        box-shadow: none;
        border: none;
        outline: none;
      }
      &:hover {
        background: rgb(250, 114, 189);
        color: #fff;
      }
    }
  }
}
</style>
