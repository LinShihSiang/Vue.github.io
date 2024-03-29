import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import paginationComponent from "./components/paginationComponent.js";
import deleteModalComponent from "./components/deleteModalComponent.js";
import editModalComponent from "./components/editModalComponent.js";
import productModalComponent from "./components/productModalComponent.js";

const url = "https://ec-course-api.hexschool.io/v2/";
const path = "mikelin-hexschool";
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);
const productCountPerPage = 3;

axios.defaults.headers.common["Authorization"] = token;

const app = createApp({
  data() {
    return {
      productDetail: {}, // 暫存產品詳細
      products: [],
      editResult: {},
      newImageUrl: "",
      is_addProduct: false,
      currentPageNum: 1,
    };
  },
  mounted() {
    this.checkSignIn();
  },
  computed: {
    productsByPage() {
      let start = productCountPerPage * (this.currentPageNum - 1);

      return this.products.slice(start, start + productCountPerPage);
    },
    totalPage() {
      return Math.ceil(this.products.length / productCountPerPage);
    },
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

      this.$refs.productModal.show();
    },
    deleteProduct(item) {
      this.productDetail = { ...item };

      this.$refs.delModal.show();
    },
    confirmDelete() {
      axios
        .delete(`${url}/api/${path}/admin/product/${this.productDetail.id}`)
        .then((response) => {
          this.getProducts();

          this.$refs.delModal.hide();
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

      this.$refs.editModal.show();
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

          this.$refs.editModal.hide();
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

          this.$refs.editModal.hide();
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
    updateCurrentPageNum(page) {
      this.currentPageNum = page;
    },
    updateNewImageUrl(url) {
      this.newImageUrl = url;
    },
  },
  components: {
    paginationComponent,
    deleteModalComponent,
    editModalComponent,
    productModalComponent,
  },
});

app.mount("#app");
