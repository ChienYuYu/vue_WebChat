import { createApp } from 'vue';
import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';

const firebaseConfig = {
  apiKey: 'AIzaSyBAh_dhNjDzyuU6OjmUlSai3q4RjJwvsnI',
  authDomain: 'webchat-840b9.firebaseapp.com',
  databaseURL: 'https://webchat-840b9-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'webchat-840b9',
  storageBucket: 'webchat-840b9.appspot.com',
  messagingSenderId: '252502221711',
  appId: '1:252502221711:web:f1cef5a59ad393877761fa',
};
firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app');
