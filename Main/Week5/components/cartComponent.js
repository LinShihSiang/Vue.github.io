import cartStore from "../stores/cartStore.js";

const { mapState, mapActions } = Pinia;

export default {
  template: `<div class="bg-lisht my-4 p-4" v-show="toggle">
    <div v-if="sortCarts.length == 0">購物車沒有品項</div>

    <table v-else class="table">
      <thead>
        <th><button type="button" class="btn btn-outline-danger" @click="removeAllCart">清空購物車</button></th>
        <th>產品圖片</th>
        <th>產品名稱</th>
        <th>數量</th>
        <th>小計</th>
      </thead>
      <tbody>
        <tr class="align-middle" v-for="item in sortCarts" :key="item.product_id">
          <td>
            <button type="button" class="btn btn-outline-danger" @click="removeCart(item.id)">x</button>
          </td>
          <td>
            <img
              class="img-product"
              :src="item.product.imageUrl"
              alt="產品圖片"
            />
          </td>
          <td>{{ item.product.title }}</td>
          <td>
            <input type="number" v-model.number="item.qty" @blur="updateCart(item)" @keyup.enter="updateCart(item)"/>
            <span> {{item.product.unit}} </span>
          </td>
          <td class="text-end">$ {{ item.final_total }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="align-middle">
          <td colspan="5" class="text-end">總計 $ {{total}}</td>
        </tr>
      </tfoot>
    </table>
  </div>`,
  mounted() {
    this.getCarts();
  },
  computed: {
    ...mapState(cartStore, ["sortCarts", "total", "toggle"]),
  },
  methods: {
    ...mapActions(cartStore, [
      "getCarts",
      "removeAllCart",
      "removeCart",
      "updateCart",
    ]),
  },
};
