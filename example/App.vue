<template>
  <div id="app" style="padding: 15px">
    <h3>简单使用</h3>
    <!-- <vue-mention v-model="text" :list="members1"></vue-mention> -->
    <h3>自定义插槽</h3>
    <vue-mention
      v-model="text"
      :label.sync="label"
      :list="menu"
      value-key="text"
      custom-char="@"
      custom-border-chart=" "
      :options="config"
    >
    </vue-mention>
    <h3>内容</h3>
    <div style="white-space: pre">{{ text }}</div>
    {{ value }}
    {{ label }}
    <div>
      <!-- <vue-menu :menu="menu" v-model="value" :label.sync="label"></vue-menu> -->
    </div>
  </div>
</template>

<script>
import { VueMention } from "../src";
export default {
  components: { VueMention },
  data() {
    return {
      value: [],
      label: null,
      menu: [
        { name: "{{home}}", title: "homelabel" },
        {
          name: "{{space}}",
          title: "MYSPACE",
          items: [
            {
              name: "{{space-1}}",
              title: "spacelabel"
            },
            {
              name: "{{space-2}}",
              title: "space2label"
            }
          ]
        }
      ],
      text: null,
      members1: ["Cyber Fei", "mxsg.com", "小明"],
      members2: [
        {
          name: "key1",
          title: "Cyber Fei"
        },
        {
          name: "key2",
          title: "mxsg.com"
        },
        {
          name: "key3",
          title: "小明"
        }
      ],
      config: {
        placeholder: "输入 @ 试下",
        rows: 6
      }
    };
  },
  mounted() {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  line-height: 1.6;
}

.vm-editor {
  width: 500px;
  line-height: 1.6;
}
.vm-editor:focus {
  border: 1px solid rgb(2, 117, 216);
  box-shadow: 0 0 0 3px rgb(2, 117, 216, 0.2);
}
</style>
