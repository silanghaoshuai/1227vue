<template>
  <div class="pagination">
    <!-- 当前页码为1时不能操作 -->
    <button
      :disabled="myCurrentPage === 1"
      @click="setCurrentPage(myCurrentPage - 1)"
    >
      上一页
    </button>
    <!-- start要大于1才显示 -->
    <button v-if="startEnd.start > 1" @click="setCurrentPage(1)">1</button>
    <!-- start要大于2才显示 -->
    <button disabled v-if="startEnd.start > 2">···</button>

    <!-- 连续页码 [start, end] -->
    <button
      v-for="num in startEnd.end"
      v-if="num >= startEnd.start"
      :class="{ active: num === myCurrentPage }"
      @click="setCurrentPage(num)"
    >
      {{ num }}
    </button>
    <!-- 
      v-for的优先级高于v-if: 先执行v-for的遍历, 每遍历一个再进行v-if的判断  面试题
    -->
    <!-- 只有在end小于totalPages-1 -->
    <button disabled v-if="startEnd.end < totalPages - 1">···</button>
    <!-- 只有在end小于totalPages -->
    <button
      v-if="startEnd.end < totalPages"
      @click="setCurrentPage(totalPages)"
    >
      {{ totalPages }}
    </button>
    <!-- 当当前页码为totalPages时不能操作 -->
    <button
      :disabled="myCurrentPage === totalPages"
      @click="setCurrentPage(myCurrentPage + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px" disabled>共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // currentPage: 当前页码
    currentPage: {
      type: Number,
      default: 1,
    },
    // pageSize: 每页数量
    pageSize: {
      type: Number,
      default: 10,
    },
    // total: 总数量
    total: {
      type: Number,
      default: 0,
    },
    // showPageNo: 连续数码数
    showPageNo: {
      type: Number,
      default: 5, // 最好指定为奇数
    },
  },

  data() {
    return {
      // 将外部传入的当前页码作为当前组件的当前面页码初始值
      myCurrentPage: this.currentPage,
    };
  },

  computed: {
    totalPages() {
      const { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },
    startEnd() {
      let start, end;
      const { myCurrentPage, showPageNo, totalPages } = this;
      // 计算start
      start = myCurrentPage - Math.floor(showPageNo / 2); // start = 4 - Math.floor(5/2)
      // 如果start小于1, 修改为1
      if (start < 1) {
        start = 1;
      }

      // 计算end
      end = start + showPageNo - 1; // 2 + 5 - 1
      // 如果end超过了totalPages, 修正为totalPages
      if (end > totalPages) {
        end = totalPages;
        // 根据连续页码数据来修正start
        start = end - showPageNo + 1; // 8 - 5 + 1
        // 如果start小于1, 修正为1
        if (start < 1) {
          start = 1;
        }
      }

      return { start, end };
    },
  },

  watch: {
    currentPage(value) {
      // 当父组件改变了其对应的当前页码数据时, 此回调函数就会自动调用
      // 更新内部的当前页码
      this.myCurrentPage = value; 
    },
  },

  methods: {
    /* 
      设置新的当前页码
      */
    setCurrentPage(currentPage) {
      // 如果设置的就是当前页码, 直接结束
      if (currentPage === this.myCurrentPage) return;
      // 一定要是更新自己data中的当前页码, 而不更新接收的currentPage属性
      this.myCurrentPage = currentPage;
      // 分发vue自定义事件: 通知父组件, 当前页码变化了
      this.$emit("currentChange", currentPage);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
