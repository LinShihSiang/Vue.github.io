import cartStore from "../stores/cartStore.js";

const { mapState, mapActions } = Pinia;

export default {
  template: `<nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">產品列表</span>
      <button type="button" class="btn" @click="toggleCart">
        購物車
        <span class="badge rounded-pill bg-danger"> {{ sortCarts.length }}</span>
      </button>
    </div>
  </nav>`,
  computed: {
    showCartsCount() {
      if (this.sortCarts.length <= 9) {
        return this.sortCarts.length;
      } else {
        return "9+";
      }
    },
    ...mapState(cartStore, ["sortCarts"]),
  },
  methods: {
    ...mapActions(cartStore, ["toggleCart"]),
  },
};
