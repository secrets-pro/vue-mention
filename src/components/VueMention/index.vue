<template>
  <div :class="`${prefix}-panel`">
    <textarea
      style="resize: none;"
      :class="`${prefix}-editor`"
      spellcheck="false"
      v-model="currentLabel"
      @input="handleInput"
      @keyup="keyup"
      @keydown="keydown"
      @blur="handleBlur"
      v-bind="options"
    ></textarea>
    <partList
      v-show="showFlag"
      ref="list"
      :list="list"
      :top="top"
      :pos="pos"
      :taW="el.offsetWidth"
      @on-select="select"
      :keyWord="keyWord"
    >
    </partList>
  </div>
</template>

<script>
import partList from "./List.vue";
import getCaretCoordinates from "./textarea-caret";
import { transationLabel, transationValue } from "@/utils/index.js";
import { debounce } from "lodash";

export default {
  name: "vue-mention",
  components: { partList },
  props: {
    // 绑定数据
    value: String,
    label: String,
    // 候选列表
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    customChar: {
      type: String,
      default: "@"
    },
    customBorderLeftChart: {
      type: String,
      default: "#"
    },
    customBorderChart: {
      type: String,
      default: "#"
    },
    // 向上打开
    top: {
      type: Boolean,
      default: false
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
    },
    beforeSelect: {
      type: Function,
      default() {
        return () => true;
      }
    }
  },
  data() {
    return {
      prefix: "mention",
      el: {},
      currentValue: this.value,
      currentLabel: transationLabel(
        this.value,
        this.list,
        // this.customChar,
        this.customBorderLeftChart,
        this.customBorderChart
      ),
      pos: { top: -100000, left: 0 },
      showFlag: false,
      keyWord: ""
    };
  },
  methods: {
    // 输入
    handleInput(e) {
      if (e.inputType) {
        this.$emit("update:label", this.currentLabel);
        // this.$emit("update:label", this.currentLabel);
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
      // this.$refs.list.now = 0;
      this.keyWord = "";
      this.pos = { top: -100000, left: 0 };
      this.$nextTick(() => {
        this.showFlag = true;
      });
    },

    // 选中列表
    select(values, labels) {
      let text = labels.join("/");
      this.showFlag = false;
      if (this.beforeSelect(values.join("/"), text)) {
        if (!text) return;

        let pos = this.el.selectionEnd;
        let str1 = this.currentLabel.slice(0, pos);
        let atPos = str1.lastIndexOf(this.customChar);

        this.currentLabel =
          this.currentLabel.slice(0, atPos) +
          this.customBorderLeftChart +
          text +
          this.customBorderChart +
          this.currentLabel.slice(pos);
        this.$emit("update:label", this.currentLabel);

        this.setRange(atPos + text.length + 1);
      }
    },

    hasItem(s) {
      return s && s.length > 0;
    },
    // changeLabel() {
    //   this.currentLabel = transationLabel(this.currentValue, this.list);
    //   this.$emit("update:label", this.currentLabel);
    // },
    changeValue() {
      this.currentValue = transationValue(
        this.currentLabel,
        this.list,
        // this.customChar,
        this.customBorderLeftChart,
        this.customBorderChart
      );
      this.handleBlur();
      this.$emit("input", this.currentValue);
    },
    // 监听按键
    keydown(e) {
      this.showFlag = false;
      // 删除
      if (e.key == "Backspace") {
        this.controlDetele(e);
      }

      if (!this.showFlag) {
        //处理左右移动
        this.controlMoveLeftRight(e);
      } else {
        if (e.key === "Escape") this.showFlag = false;
      }

      this.keyWord += "";
    },
    handleBlur() {
      this.dispatch("FormItem", "on-form-blur", this.currentValue);
    },
    controlMoveLeftRight(e) {
      let key = e.key;
      if (key === "ArrowLeft" || key === "ArrowRight") {
        e.preventDefault();
        e.stopPropagation();
        let pos = this.el.selectionEnd;

        this.setRange(pos + (key === "ArrowLeft" ? -1 : 1));
        // this.$refs.list.key(e.key);
      }
    },
    controlDetele(e) {
      let pos = this.el.selectionEnd; // 光标所处位置
      let str1 = this.currentLabel.slice(0, pos); // 光标前的内容
      let str2 = this.currentLabel.slice(pos); // 后面的内容

      let atPos = str1.lastIndexOf(this.customBorderLeftChart); // 光标前最后一个@字符的位置

      // 删除 @ 隐藏列表
      if (pos == atPos + 1) {
        this.showFlag = false;
      }
      // 找到最后一个@字符分位置和当前光标位置之间 是否有多个空格（index===lastIndex）
      let isnbsp = str1.charAt(str1.length - 1) == this.customBorderChart;
      let isBordernbsp =
        str1.indexOf(this.customBorderChart, atPos) ===
        str1.lastIndexOf(this.customBorderChart);
      if (atPos > -1 && isnbsp && isBordernbsp) {
        let s = str1.slice(atPos + 1, str1.length - 1);
        if (this.hasItem(s)) {
          e.preventDefault();
          e.stopPropagation();
          str1 = this.currentLabel.slice(0, atPos);
          this.currentLabel = str1 + str2;
          this.$emit("update:label", this.currentLabel);
          this.setRange(atPos);
        }
      }
    },
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      // console.log(parent, name);
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
        // console.log(parent, name);
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    list(value) {
      this.currentLabel = transationLabel(
        this.value,
        value,
        // this.customChar,
        this.customBorderLeftChart,
        this.customBorderChart
      );
    },
    currentLabel() {
      this.changeValue();
    }
  },
  mounted() {
    this.el = this.$el.querySelector("textarea");
    // this.changeLabel = debounce(this.changeLabel, 250);
    this.changeValue = debounce(this.changeValue, 250);
    // this.controlMoveLeftRight = debounce(this.controlMoveLeftRight, 200);
    // this.controlDetele = debounce(this.controlDetele, 200);
  }
};
</script>
