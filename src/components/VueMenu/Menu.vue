<template>
  <div class="chid-nav-wrap">
    <ul class="chid-nav" v-if="items">
      <li v-for="cm in items" :key="cm.name">
        <div @click="triggerClick(cm)">
          <a>{{ cm.title }}</a>
          <sm-menu
            :parent="cm"
            :items="cm.items"
            @on-click="childClick"
            v-if="cm.items"
          ></sm-menu>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "sm-menu",
  props: {
    items: Array,
    parent: Object,
    default() {
      return [];
    }
  },
  methods: {
    triggerClick(item) {
      if (!item.items) {
        const params = this.parent ? [this.parent] : [];
        params.push(item);
        this.$emit("on-click", params);
      }
    },
    childClick(items) {
      const params = this.parent ? [this.parent] : [];
      this.$emit("on-click", params.concat(items));
    }
  }
};
</script>
