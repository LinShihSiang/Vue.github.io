// 產品資料格式
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const url = "https://ec-course-api.hexschool.io/v2/";
const path = "mikelin-hexschool";
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);
let deleteProductModal = null;
let addProductModal = null;
let productModal = null;

axios.defaults.headers.common["Authorization"] = token;

createApp({
  data() {
    return {
      productDetail: {}, // 暫存產品詳細
      products: [],
      newProduct: {},
      newImageUrl: "",
    };
  },
  mounted() {
    deleteProductModal = new bootstrap.Modal(
      document.querySelector("#deleteProductModal")
    );
    addProductModal = new bootstrap.Modal(
      document.querySelector("#addProductModal")
    );
    productModal = new bootstrap.Modal(document.querySelector("#productModal"));

    this.checkSignIn();
  },
  methods: {
    checkSignIn() {
      // 驗證帳號是否登入
      axios
        .post(`${url}/api/user/check`)
        .then((response) => {
          // 登入狀態才取得產品資料
          this.getProducts();
        })
        .catch((error) => {
          // 非登入狀態提示後轉回登入頁
          alert(error.response.data.message);

          window.location.href = `LoginIn.html`;
        });
    },
    // 觸發事件:取得全部產品
    getProducts() {
      axios
        .get(`${url}/api/${path}/admin/products/all`)
        .then((response) => {
          // 空資料時不處理
          if (response.data.products == null) {
            this.products = [];
            return;
          }

          this.products = Object.values(response.data.products);
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    // 觸發事件:取得產品詳細
    getProductDetail(item) {
      // 將選擇的產品詳細賦予暫存物件
      this.productDetail = { ...item };

      productModal.show();
    },
    confirmDeleteProduct(item) {
      this.productDetail = { ...item };

      deleteProductModal.show();
    },
    deleteProduct() {
      // call api delete
      axios
        .delete(`${url}/api/${path}/admin/product/${this.productDetail.id}`)
        .then((response) => {
          this.getProducts();

          deleteProductModal.hide();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    editNewProduct() {
      addProductModal.show();
    },
    addNewProduct() {
      axios
        .post(`${url}/api/${path}/admin/product`, {
          data: this.newProduct,
        })
        .then((response) => {
          this.getProducts();
          this.newProduct = {};

          addProductModal.hide();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    insertImageUrl() {
      this.newProduct.imageUrl = this.newImageUrl;
      this.newImageUrl = "";
    },
    deleteImageUrl() {
      this.newProduct.imageUrl = null;
    },
  },
}).mount("#app");
