export default {
  data() {
    return {
      currentPageNum: 1,
    };
  },
  props: {
    totalPage: Number,
  },
  template: `<nav aria-label="Product List Page">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="editPageNum(-1)" >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="num in totalPage" :key="num" :class="getPageStyle(num)" >
        <a class="page-link" href="#" @click.prevent="changeTargetPage(num)"
          >{{ num }}</a
        >
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="editPageNum(1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`,
  methods: {
    getPageStyle(page) {
      return {
        active: page == this.currentPageNum,
      };
    },
    editPageNum(num) {
      let result = this.currentPageNum + num;

      result = Math.min(result, this.totalPage);
      result = Math.max(result, 1);

      this.currentPageNum = result;

      this.$emit("get-current-page-num", this.currentPageNum);
    },
    changeTargetPage(page) {
      this.currentPageNum = page;

      this.$emit("get-current-page-num", this.currentPageNum);
    },
  },
};
