const { defineStore } = Pinia;
const apiUrl = "https://ec-course-api.hexschool.io/v2/";
const apiPath = "mikelin-hexschool";

export default defineStore("productStore", {
  state: () => ({
    products: [],
  }),
  getters: {
    sortProducts: ({ products }) => {
      return products.sort((x, y) => {
        return x.price - y.price;
      });
    },
  },
  actions: {
    getProducts() {
      axios
        .get(`${apiUrl}/api/${apiPath}/products/all`)
        .then((response) => {
          if (response.data.products == null) {
            this.products = [];
            return;
          }

          this.products = Object.values(response.data.products);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
});
