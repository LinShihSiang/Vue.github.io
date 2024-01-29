export default {
  data() {
    return {
      modal: null,
    };
  },
  props: ["productDetail"],
  template: `<div
    id="productModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>產品細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="card mb-3">
            <!-- 依序顯示產品詳細、圖片來源 -->
            <img
              :src="productDetail.imageUrl"
              class="card-img-top primary-image"
              alt="主圖"
            />
            <div class="card-body">
              <h5 class="card-title">
                {{ productDetail.title }}
                <span class="badge bg-primary ms-2"
                  >{{ productDetail.category }}</span
                >
              </h5>
              <p class="card-text">
                商品描述：{{ productDetail.description }}
              </p>
              <p class="card-text">
                商品內容：{{ productDetail.content }}
              </p>
              <div class="d-flex">
                <p class="card-text me-2">{{ productDetail.price }}</p>
                <p class="card-text text-secondary">
                  <del>{{ productDetail.origin_price }}</del>
                </p>
                元 / {{ productDetail.unit }}
              </div>
            </div>
          </div>

          <!-- 顯示該產品更多張圖片，唯一值(key)=圖片網址 -->
          <template v-for="item in productDetail.imagesUrl" :key="item">
            <img :src="item" alt="" class="images m-2" />
          </template>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>`,
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
  methods: {
    show() {
      this.modal.show();
    },
    hide() {
      this.modal.hide();
    },
  },
};
