const { defineStore } = Pinia;
const apiUrl = "https://ec-course-api.hexschool.io/v2/";
const apiPath = "mikelin-hexschool";

export default defineStore("cartStore", {
  state: () => ({
    carts: [],
    toggle: false,
    cartLoadingState: false,
  }),
  getters: {
    sortCarts: ({ carts }) => {
      return carts;
    },
    total: ({ carts }) => {
      return carts.reduce((total, next) => {
        return total + next.final_total;
      }, 0);
    },
  },
  actions: {
    toggleCart() {
      this.toggle = !this.toggle;
    },
    getCarts() {
      this.cartLoadingState = true;

      axios
        .get(`${apiUrl}/api/${apiPath}/cart`)
        .then((response) => {
          this.cartLoadingState = false;

          if (response.data.data.carts == null) {
            this.carts = [];
            return;
          }

          this.carts = response.data.data.carts;
        })
        .catch((error) => {
          this.cartLoadingState = false;
          alert(error.response.data.message);
        });
    },
    editCart(product) {
      var index = this.carts.findIndex((x) => x.product_id == product.id);

      if (index < 0) {
        this.addCart(product);
      } else {
        this.carts[index].qty++;

        this.updateCart(this.carts[index]);
      }
    },
    addCart(product, count = 1) {
      this.cartLoadingState = true;

      axios
        .post(`${apiUrl}/api/${apiPath}/cart`, {
          data: {
            product_id: product.id,
            qty: count,
          },
        })
        .then((response) => {
          this.cartLoadingState = false;
          alert(response.data.message);
          this.getCarts();
        })
        .catch((error) => {
          this.cartLoadingState = false;
          alert(error.response.data.message);
        });
    },
    updateCart(data) {
      this.cartLoadingState = true;

      axios
        .put(`${apiUrl}/api/${apiPath}/cart/${data.id}`, {
          data: {
            product_id: data.product_id,
            qty: data.qty,
          },
        })
        .then((response) => {
          this.cartLoadingState = false;
          alert(response.data.message);
          this.getCarts();
        })
        .catch((error) => {
          this.cartLoadingState = false;
          alert(error.response.data.message);
        });
    },
    removeAllCart() {
      this.cartLoadingState = true;

      axios
        .delete(`${apiUrl}/api/${apiPath}/carts`)
        .then((response) => {
          this.cartLoadingState = false;
          alert(response.data.message);
          this.getCarts();
        })
        .catch((error) => {
          this.cartLoadingState = false;
          alert(error.response.data.message);
        });
    },
    removeCart(id) {
      this.cartLoadingState = true;

      axios
        .delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
        .then((response) => {
          this.cartLoadingState = false;
          alert(response.data.message);
          this.getCarts();
        })
        .catch((err) => {
          this.cartLoadingState = false;
          alert(err.response.data.message);
        });
    },
  },
});
