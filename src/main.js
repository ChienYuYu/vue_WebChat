import { createApp } from 'vue';
import firebase from 'firebase/app';
import 'bootstrap-icons/font/bootstrap-icons.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
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
const app = createApp(App);
app.use(VueSweetalert2);
app.use(router);
app.mount('#app');
