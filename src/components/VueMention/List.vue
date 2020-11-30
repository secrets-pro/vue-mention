<template>
  <div
    :class="`${prefix}-open`"
    :style="{ top: pos.top + 'px', left: pos.left + 'px' }"
  >
    <div :class="calc()" :style="{ width: listWidth + 'px' }">
      <div :class="`${prefix}-containers`">
        <!-- <div
          v-for="(item, i) in currentList"
          @mousedown="handleMD($event, i)"
          @mouseenter="now = i"
          :key="i"
          :class="{ [`${prefix}-list-item`]: true, sel: i == now }"
        >
          {{ text(item) }}
        </div> -->
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
    keyWord: String,
    // 获取item的value
    getValue: {
      type: Function,
      default() {
        return item => item;
      }
    },
    // value字段名
    valueKey: String
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
  watch: {
    currentvalue(n) {
      console.log(`n ${n}`);
    },
    currentLabel(n) {
      console.log(`n ${n}`);
    }
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
      console.log(ls);
      return ls;
      // return this.list.filter((item) => {
      //   return (
      //     this.getValue(item)
      //       .toLowerCase()
      //       .indexOf(this.keyWord.toLowerCase()) > -1
      //   );
      // });
    }
  },
  methods: {
    chooseMenu(...items) {
      console.log(items);
    },
    text(item) {
      return this.getValue(item);
    },
    key(type) {
      if (type == "ArrowDown") this.now = ++this.now % this.currentList.length;
      if (type == "ArrowUp")
        this.now =
          (--this.now + this.currentList.length) % this.currentList.length;
      this.$nextTick(() => {
        this.$el.querySelector(".sel").scrollIntoView(false);
      });
    },
    sel() {
      this.$emit("on-select", this.currentList[this.now]);
    },
    handleMD(e, i) {
      this.now = i;
      this.sel();
      e.preventDefault();
      e.stopPropagation();
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
