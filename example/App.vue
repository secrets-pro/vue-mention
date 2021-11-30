<template>
  <div id="app">
    <vue-mention
      v-model="text"
      :label.sync="label"
      :list="menu"
      value-key="text"
      custom-char="@"
      custom-border-left-chart="<"
      custom-border-chart=">"
      :options="config"
      clearNotMatched
      :beforeSelect="beforeSelect"
    >
    </vue-mention>
    <h3>内容</h3>
    <div style="white-space: pre">v-model {{ text }}</div>
    <div style="white-space: pre">label {{ label }}</div>

    <div>
      <!-- <vue-menu :menu="menu" v-model="value" :label.sync="label"></vue-menu> -->
    </div>
  </div>
</template>

<script>
let s = [
  {
    name: "global",
    title: "全局参数",
    items: [{ name: "{{workflow.parameters.xas}}", title: "xasxas" }]
  },
  {
    name: "",
    title: "运行参数",
    items: [
      { name: "{{workflow.duration}}", title: "流水线运行持续时间" },
      { name: "{{workflow.parameters.leo-app-name}}", title: "应用名称" },
      {
        name: "{{workflow.parameters.workflow-workspace-path}}",
        title: "工作空间路径"
      },
      { name: "{{workflow.parameters.leo-app-alias}}", title: "应用名称别名" },
      { name: "{{workflow.uid}}", title: "流水线运行记录Id" },
      {
        name: "{{workflow.parameters}}",
        title: "流水线运行记录全部参数以Json编码"
      },
      { name: "{{workflow.creationTimestamp}}", title: "流水线记录创建时间" },
      {
        name: "{{workflow.parameters.leo-pipeline-name}}",
        title: "流水线名称"
      },
      {
        name: "{{workflow.parameters.leo-app-branch}}",
        title: "源码分支(仅在webhook有效)"
      },
      {
        name: "{{workflow.parameters.leo-app-source}}",
        title: "源码地址(仅在webhook有效)"
      },
      { name: "{{workflow.name}}", title: "流水线运行记录名称" },
      { name: "{{workflow.parameters.leo-project-name}}", title: "空间名称" },
      { name: "{{workflow.parameters.leo-tenant-name}}", title: "租户名称" }
    ]
  },
  {
    name: "fdlqqfa-iwuauph",
    title: "源码拉取",
    items: [
      {
        name: "{{tasks.fdlqqfa-iwuauph.outputs.parameters.commit-id}}",
        title: "Commit版本号"
      }
    ]
  }
];
import { VueMention } from "../src";
export default {
  components: { VueMention },
  data() {
    return {
      value: [],
      label: null,
      menu: [],
      text: "<{{workflow.parameters.workflow-workspace-path1}}>",
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
  created() {
    this.randowmString();
  },
  methods: {
    randowmString() {
      var length = Math.floor(5 + Math.random() * 5);
      let ms = [];
      for (let i = 0; i < length; i++) {
        let o = {
          name: "level1-" + i,
          title: "homelabel" + i,
          items: new Array(5).fill(1).map((el, index) => {
            return {
              name: "level1-" + i + "level2-" + index,
              title: "level1" + i + "level2" + index
            };
          })
        };
        ms.push(o);
      }
      // this.menu = ms;
    },
    beforeSelect(v, l) {
      console.log(v, l);
      return true;
    }
  },
  mounted() {
    setTimeout(() => {
      this.menu = s;
    }, 1);
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
