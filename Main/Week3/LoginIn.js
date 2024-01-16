import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const url = "https://ec-course-api.hexschool.io/v2/";
const path = "mikelin-hexschool";

createApp({
  data() {
    return {};
  },
  methods: {
    clickSignIn() {
      axios
        .post(`${url}/admin/signin`, {
          username: document.querySelector("#username").value,
          password: document.querySelector("#password").value,
        })
        .then((response) => {
          const { token, expired } = response.data;

          // 暫存 cookie 資料
          document.cookie = `hextoken=${token};expires=${new Date(expired)}`;

          // 導向產品列表
          window.location.href = `Products.html`;
        })
        .catch((error) => {
          console.log(error.response);

          alert(error.response.data.error.message);
        });
    },
  },
}).mount("#app");
