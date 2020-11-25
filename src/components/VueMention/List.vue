<template>
  <div
    :class="`${prefix}-open`"
    :style="{ top: pos.top + 'px', left: pos.left + 'px' }"
  >
    <div :class="calc()" :style="{ width: listWidth + 'px' }">
      <div
        v-for="(item, i) in currentList"
        @mousedown="handleMD($event, i)"
        @mouseenter="now = i"
        :key="i"
        :class="{ [`${prefix}-list-item`]: true, sel: i == now }"
      >
        <slot name="item" :item="item">{{ item }}</slot>
      </div>
      <div
        :class="`${prefix}-list-item`"
        v-show="currentList.length == 0"
        style="text-align: center; color: #aaa"
      >
        <div>无匹配项</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      prefix: "mention",
      now: 0,
      listWidth: 140
    };
  },
  computed: {
    currentList() {
      // return this.list;
      return this.list.filter(item => {
        return (
          this.getValue(item)
            .toLowerCase()
            .indexOf(this.keyWord.toLowerCase()) > -1
        );
      });
    }
  },
  methods: {
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
      this.$emit("on-select", this.getValue(this.currentList[this.now]));
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
