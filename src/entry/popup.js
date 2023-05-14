import { store } from '../storage/storage.js';
import { createI18n } from 'vue-i18n'
import { createApp } from 'vue'
import App from '../view/popup.vue'
import pt from '../locales/pt.json';
import en from '../locales/en.json';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    pt: pt,
    en: en
  }
})

const app = createApp(App);

app.use(i18n);
app.use(store);
app.mount('#app');