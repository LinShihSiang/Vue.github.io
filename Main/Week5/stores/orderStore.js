import cartStore from "./cartStore.js";

const { defineStore } = Pinia;
const apiUrl = "https://ec-course-api.hexschool.io/v2/";
const apiPath = "mikelin-hexschool";

export default defineStore("orderStore", {
  state: () => ({
    orderLoadingState: false,
    created: false,
  }),
  actions: {
    createOrder(information) {
      this.orderLoadingState = true;

      axios
        .post(`${apiUrl}/api/${apiPath}/order`, {
          data: information,
        })
        .then((response) => {
          this.orderLoadingState = false;
          this.created = true;

          alert(response.data.message);

          cartStore().getCarts();
        })
        .catch((error) => {
          this.orderLoadingState = false;

          alert(error.response.data.message);
        });
    },
    resetCreated() {
      this.created = false;
    },
  },
});
