import { h, ref, reactive } from "../../lib/mini-vue.esm.js";

export default {
  name: "App",
  setup() {
    console.log('---------8888-------------');
    const foo = reactive({
      count: 0,
      name: "cui",
    });
  
    effect(() => {
      effect(() => {
        console.log("inside effect: ", foo.name);
      });
      console.log("outside effect: ", foo.count);
    });
  
    foo.count++;
  },

  render() {
    return h("h2", {}, '我是test');
  },
};
