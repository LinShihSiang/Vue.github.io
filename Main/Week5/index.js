import NavBarComponent from "./components/navBarComponent.js";
import CartComponent from "./components/cartComponent.js";
import ProductListComponent from "./components/productListComponent.js";
import ProductModalComponent from "./components/productModalComponent.js";
import OrderComponent from "./components/orderComponent.js";
import productStore from "./stores/productStore.js";
import cartStore from "./stores/cartStore.js";
import orderStore from "./stores/orderStore.js";

const { createApp } = Vue;
const { createPinia, mapState } = Pinia;
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

loadLocaleFromURL(
  "https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
);

configure({
  generateMessage: localize("zh_TW"),
});

const app = createApp({
  data() {
    return {
      productDetail: {},
    };
  },
  methods: {
    showProductDetail(product) {
      this.productDetail = product;

      this.$refs.productModal.show();
    },
  },
  computed: {
    isLoading() {
      return (
        this.productLoadingState ||
        this.cartLoadingState ||
        this.orderLoadingState
      );
    },
    ...mapState(productStore, ["productLoadingState"]),
    ...mapState(cartStore, ["cartLoadingState"]),
    ...mapState(orderStore, ["orderLoadingState"]),
  },
  components: {
    NavBarComponent,
    CartComponent,
    ProductListComponent,
    ProductModalComponent,
    OrderComponent,
  },
});

app.component("loading", VueLoading.Component);
app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);

const pinia = createPinia();

app.use(pinia);
app.mount("#app");
