import { ref } from "vue";

export default {
  setup() {
    const message = ref(`<a href='www.baidu.com'>百度</a>`);
    return {
      message,
    };
  },
  template: `<p>{{message}}</p><p v-html="message"></p>`,
};
