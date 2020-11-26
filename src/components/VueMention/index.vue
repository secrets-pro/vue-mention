<template>
  <div :class="`${prefix}-panel`">
    <textarea
      style="resize: none"
      :class="`${prefix}-editor`"
      spellcheck="false"
      v-model="currentValue"
      @input="handleInput"
      @keyup="keyup"
      @keydown="keydown"
      @blur="showFlag = false"
      v-bind="options"
    ></textarea>
    <partList
      v-show="showFlag"
      ref="list"
      :list="list"
      :top="top"
      :pos="pos"
      :taW="el.offsetWidth"
      @on-select="sel"
      :keyWord="keyWord"
      :getValue="getValue"
      :valueKey="valueKey"
    >
      <template slot="item" slot-scope="props">
        <slot name="item" :item="props.item"></slot>
      </template>
    </partList>
  </div>
</template>

<script>
import partList from "./List.vue";
import getCaretCoordinates from "./textarea-caret";

export default {
  name: "vue-mention",
  components: { partList },
  props: {
    // 绑定数据
    value: String,
    // 候选列表
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    customChar: {
      type: String,
      default() {
        return "@";
      }
    },
    // 向上打开
    top: {
      type: Boolean,
      default: false
    },
    // 显示字段名
    valueKey: {
      type: String
    },
    // 原生配置
    options: {
      type: Object,
      default: () => {
        return {
          placeholder: "请输入...",
          rows: 3
        };
      }
    }
  },
  data() {
    return {
      prefix: "mention",
      el: {},
      currentValue: this.value,
      pos: { top: -100000, left: 0 },
      showFlag: false,
      keyWord: ""
    };
  },
  methods: {
    // 获取item的value
    getValue(item) {
      return this.valueKey ? item[this.valueKey] : item;
    },

    // 输入
    handleInput(e) {
      if (e.inputType) {
        this.$emit("input", this.currentValue);
        if (e.data === this.customChar) this.show();
        if (this.showFlag) {
          this.$nextTick(() => {
            let pos = this.el.selectionEnd;
            let str1 = this.value.slice(0, pos);
            let atPos = str1.lastIndexOf(this.customChar);
            this.keyWord = str1.slice(atPos + 1);
          });
        }
      }
    },

    // 设置光标位置
    setRange(pos) {
      this.$nextTick(() => {
        this.el.setSelectionRange(pos, pos);
      });
    },

    // 计算列表位置
    calcPos() {
      let pos = getCaretCoordinates(this.el, this.el.selectionEnd);
      pos.top -= this.el.scrollTop - 10;
      this.pos = pos;
    },
    keyup() {
      if (this.showFlag) this.calcPos();
    },

    // 打开列表
    show() {
      this.$refs.list.now = 0;
      this.keyWord = "";
      this.pos = { top: -100000, left: 0 };
      this.$nextTick(() => {
        this.showFlag = true;
      });
    },

    // 选中列表
    sel(item) {
      let text = this.getValue(item);
      this.showFlag = false;

      if (!text) return;

      let pos = this.el.selectionEnd;
      let str1 = this.value.slice(0, pos);
      let atPos = str1.lastIndexOf(this.customChar) + 1;

      this.currentValue =
        this.value.slice(0, atPos) + text + " " + this.value.slice(pos);
      this.$emit("input", this.currentValue);

      this.setRange(atPos + text.length + 1);
    },

    hasItem(s) {
      for (let i = 0; i < this.list.length; i++) {
        let value = this.getValue(this.list[i]);
        if (value == s) return true;
      }
      return false;
    },

    // 监听按键
    keydown(e) {
      // 删除
      if (e.key == "Backspace") {
        // this.showFlag = false;

        let pos = this.el.selectionEnd;
        let str1 = this.value.slice(0, pos);
        let str2 = this.value.slice(pos);

        let atPos = str1.lastIndexOf(this.customChar);

        // 删除 @ 隐藏列表
        if (pos == atPos + 1) {
          this.showFlag = false;
        }

        // 列表项整体删除
        if (atPos > -1 && str1.charAt(str1.length - 1) == " ") {
          let s = str1.slice(atPos + 1, str1.length - 1);
          if (this.hasItem(s)) {
            e.preventDefault();
            e.stopPropagation();
            str1 = this.value.slice(0, atPos);
            this.currentValue = str1 + str2;
            this.$emit("input", this.currentValue);
            this.setRange(atPos);
          }
        }
      }

      if (this.showFlag) {
        if (
          e.key === "ArrowUp" ||
          e.key === "ArrowDown" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight"
        ) {
          e.preventDefault();
          e.stopPropagation();
          this.$refs.list.key(e.key);
        }
        if (e.key === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          this.$refs.list.sel();
        }
        if (e.key === "Escape") this.showFlag = false;
      }

      this.keyWord += "";
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    }
  },
  mounted() {
    this.el = this.$el.querySelector("textarea");
  }
};
</script>
