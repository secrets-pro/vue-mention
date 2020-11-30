<template>
  <div class="sm-menu">
    <sm-menu :items="menu" @on-click="triggerClick"></sm-menu>
  </div>
</template>

<script>
import SmMenu from "./Menu";
export default {
  components: {
    SmMenu
  },
  name: "vue-menu",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    label: {
      type: Array,
      default() {
        return [];
      }
    },
    menu: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      currentValue: this.value,
      currentLabel: this.label,
      menus: this.menu
    };
  },
  watch: {
    active(n) {
      this.currentValue = n;
    }
  },
  methods: {
    triggerClick(item) {
      // 构造
      let v = item.map(el => el.name);
      let l = item.map(el => el.title);
      this.currentValue = v;
      this.currentLabel = l;
      this.$emit("input", v);
      this.$emit("update:label", l);
    }
  }
};
</script>
