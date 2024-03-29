// 產品資料格式
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const url = "https://ec-course-api.hexschool.io/v2/";
const path = "mikelin-hexschool";
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);
let deleteModal = null;
let productModal = null;
let detailModal = null;

axios.defaults.headers.common["Authorization"] = token;

createApp({
  data() {
    return {
      productDetail: {}, // 暫存產品詳細
      products: [],
      editResult: {},
      newImageUrl: "",
      is_addProduct: false,
    };
  },
  mounted() {
    deleteModal = new bootstrap.Modal(document.querySelector("#deleteModal"));
    productModal = new bootstrap.Modal(document.querySelector("#productModal"));
    detailModal = new bootstrap.Modal(document.querySelector("#detailModal"));

    this.checkSignIn();
  },
  methods: {
    checkSignIn() {
      axios
        .post(`${url}/api/user/check`)
        .then((response) => {
          this.getProducts();
        })
        .catch((error) => {
          alert(error.response.data.message);

          window.location.href = `LoginIn.html`;
        });
    },
    getProducts() {
      axios
        .get(`${url}/api/${path}/admin/products/all`)
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
    getProductDetail(item) {
      this.productDetail = { ...item };

      detailModal.show();
    },
    deleteProduct(item) {
      this.productDetail = { ...item };

      deleteModal.show();
    },
    confirmDelete() {
      axios
        .delete(`${url}/api/${path}/admin/product/${this.productDetail.id}`)
        .then((response) => {
          this.getProducts();

          deleteModal.hide();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    editProduct(item = null) {
      this.is_addProduct = item == null;

      if (this.is_addProduct) {
        this.editResult = {};
      } else {
        this.editResult = { ...item };
      }

      productModal.show();
    },
    confirmEdit() {
      if (this.is_addProduct) {
        this.insertProduct();
      } else {
        this.updateProduct();
      }
    },
    insertProduct() {
      axios
        .post(`${url}/api/${path}/admin/product`, {
          data: this.editResult,
        })
        .then((response) => {
          this.getProducts();

          productModal.hide();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    updateProduct() {
      axios
        .put(`${url}/api/${path}/admin/product/${this.editResult.id}`, {
          data: this.editResult,
        })
        .then((response) => {
          this.getProducts();

          productModal.hide();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    insertImageUrl() {
      this.editResult.imageUrl = this.newImageUrl;
      this.newImageUrl = "";
    },
    deleteImageUrl() {
      this.editResult.imageUrl = null;
    },
  },
}).mount("#app");
