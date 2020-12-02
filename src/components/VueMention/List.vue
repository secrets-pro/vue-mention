<template>
  <div
    :class="`${prefix}-open`"
    :style="{ top: pos.top + 'px', left: pos.left + 'px' }"
  >
    <div :class="calc()" :style="{ width: listWidth + 'px' }">
      <div :class="`${prefix}-containers`">
        <vue-menu
          :menu="currentList"
          v-model="currentvalue"
          @on-click="chooseMenu"
          :label.sync="currentLabel"
        ></vue-menu>
        <div
          :class="`${prefix}-list-item`"
          v-show="currentList.length == 0"
          style="text-align: center; color: #aaa"
        >
          <div>无匹配项</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueMenu } from "@secrets/vue-menu";
export default {
  components: {
    "vue-menu": VueMenu
  },
  props: {
    // 列表数据
    list: Array,
    // 顶部打开
    top: Boolean,
    // 输入框对象
    taW: Number,
    // 位置
    pos: Object,
    // 筛选关键字
    keyWord: String
    // 获取item的value
  },
  data() {
    return {
      currentvalue: [],
      currentLabel: [],
      prefix: "mention",
      now: 0,
      listWidth: 140
    };
  },

  computed: {
    currentList() {
      let ls = this.list.map(el => {
        if (Object.prototype.toString.call(el) === "[object Object]") {
          return el;
        }
        return {
          name: el,
          title: el
        };
      });
      return ls;
    }
  },
  methods: {
    chooseMenu(...items) {
      this.$emit("on-select", ...items);
    },
    // key(type) {
    //   if (type == "ArrowDown") this.now = ++this.now % this.currentList.length;
    //   if (type == "ArrowUp")
    //     this.now =
    //       (--this.now + this.currentList.length) % this.currentList.length;
    //   this.$nextTick(() => {
    //     this.$el.querySelector(".sel").scrollIntoView(false);
    //   });
    // },
    sel() {
      this.$emit("on-select", this.currentList[this.now]);
    },
    // 避免在最右侧被遮挡
    calc() {
      let classNames = [`${this.prefix}-list`];
      if (this.pos.left + this.listWidth > this.taW + 40) {
        classNames.push(`${this.prefix}-right`);
      } else {
        classNames.push(`${this.prefix}-left`);
      }
      classNames.push(`${this.prefix}-top`);
      return classNames;
    }
  }
};
</script>
