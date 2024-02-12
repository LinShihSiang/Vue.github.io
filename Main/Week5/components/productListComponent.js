import productStore from "../stores/productStore.js";
import cartStore from "../stores/cartStore.js";

const { mapState, mapActions } = Pinia;

export default {
  template: `<div class="row row-cols-3 g-4">
    <div class="col" v-for="item in sortProducts" :key="item.id">
      <div class="card" style="width: 18rem">
        <img
          :src="item.imageUrl"
          class="card-img-top"
          alt="產品圖片"
        />
        <div class="card-body">
          <h5 class="card-title">
          {{ item.title }} 
          <span class="float-end">$ {{ item.price }}</span>
          </h5>
          <button type="button" class="btn btn-outline-primary">
            產品詳細
          </button>
          <button type="button" class="btn btn-outline-success" @click.prevent="editCart(item)">
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>`,
  mounted() {
    this.getProducts();
  },
  computed: {
    ...mapState(productStore, ["sortProducts"]),
  },
  methods: {
    ...mapActions(productStore, ["getProducts"]),
    ...mapActions(cartStore, ["editCart"]),
  },
};
