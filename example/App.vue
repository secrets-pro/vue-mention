<template>
  <div id="app" style="padding: 15px">
    <h3>简单使用</h3>
    <vue-mention v-model="text" :list="members1"></vue-mention>
    <h3>自定义插槽</h3>
    <vue-mention
      v-model="text"
      :list="members2"
      value-key="text"
      custom-char="#"
      :options="config"
    >
    </vue-mention>
    <h3>内容</h3>
    <div style="white-space: pre">{{ text }}</div>
    {{ value }}
    {{ label }}
    <div>
      <vue-menu :menu="menu" v-model="value" :label.sync="label"></vue-menu>
    </div>
  </div>
</template>

<script>
import VueMention from "../src/components/VueMention/";
import VueMenu from "../src/components/VueMenu";
export default {
  components: { VueMention, VueMenu },
  data() {
    return {
      value: [],
      label: [],
      menu: [
        { name: "home", title: "home" },
        {
          name: "space",
          title: "MY SPACE",
          items: [
            {
              name: "space-1",
              title: "space",
              items: [
                { name: "space-2-1", title: "space-2-1" },
                { name: "space-2-2", title: "space-2-2" }
              ]
            },
            {
              name: "space-2",
              title: "space2",
              items: [
                { name: "space-2-1", title: "space-2-1" },
                { name: "space-2-2", title: "space-2-2" }
              ]
            }
          ]
        },
        {
          name: "INFOMATION",
          title: "INFOMATION",
          items: [
            { name: "333", title: "333" },
            {
              name: "444",
              title: "444",
              items: [
                { name: "space-2-1", title: "space-2-1" },
                { name: "space-2-2", title: "space-2-2" }
              ]
            },
            {
              name: "555",
              title: "555",
              items: [
                { name: "space-3-1", title: "space-3-1" },
                { name: "space-3-2", title: "space-3-2" },
                { name: "space-3-3", title: "space-3-2" },
                { name: "space-3-4", title: "space-3-2" }
              ]
            }
          ]
        }
      ],
      text: "Hello World! @Cyber Fei \n@mxsg.com @小明 ahaha",
      members1: ["Cyber Fei", "mxsg.com", "小明"],
      members2: [
        {
          key: "key1",
          text: "Cyber Fei"
        },
        {
          key: "key2",
          text: "mxsg.com"
        },
        {
          key: "key3",
          text: "小明"
        }
      ],
      config: {
        placeholder: "输入 @ 试下",
        rows: 6
      }
    };
  }
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
