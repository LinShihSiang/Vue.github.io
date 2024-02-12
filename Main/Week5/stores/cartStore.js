const { defineStore } = Pinia;
const apiUrl = "https://ec-course-api.hexschool.io/v2/";
const apiPath = "mikelin-hexschool";

export default defineStore("cartStore", {
  state: () => ({
    carts: [],
    toggle: false,
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
      axios
        .get(`${apiUrl}/api/${apiPath}/cart`)
        .then((response) => {
          if (response.data.data.carts == null) {
            this.carts = [];
            return;
          }

          this.carts = response.data.data.carts;
        })
        .catch((error) => {
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
      axios
        .post(`${apiUrl}/api/${apiPath}/cart`, {
          data: {
            product_id: product.id,
            qty: count,
          },
        })
        .then((response) => {
          alert(response.data.message);
          this.getCarts();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    updateCart(data) {
      axios
        .put(`${apiUrl}/api/${apiPath}/cart/${data.id}`, {
          data: {
            product_id: data.product_id,
            qty: data.qty,
          },
        })
        .then((response) => {
          alert(response.data.message);
          this.getCarts();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    removeAllCart() {
      axios
        .delete(`${apiUrl}/api/${apiPath}/carts`)
        .then((response) => {
          alert(response.data.message);
          this.getCarts();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    removeCart(id) {
      axios
        .delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
        .then((response) => {
          alert(response.data.message);
          this.getCarts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
});
