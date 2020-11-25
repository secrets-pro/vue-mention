# Vue 提醒插件

## How to use

```bash
npm install @secrets/vue-mention
```

```html
<template>
  <vue-mention v-model="text" :list="members1"></vue-mention>
</template>
```

```javascript
import VueMention from "@secrets/vue-mention";

export default {
  components: { VueMention },
  data() {
    return {
      text: "Hello World! @Cyber Fei \n@mxsg.com @小明 ahaha",
      members1: ["Cyber Fei", "mxsg.com", "小明"]
    };
  }
};
```
