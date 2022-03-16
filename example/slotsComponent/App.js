import { h, ref, reactive } from "../../lib/mini-vue.esm.js";
import Child from "./Child.js";

export default {
  name: "App",
  setup() {},

  render() {
    console.log('--------------1111-----------');
    console.log(this.$slots);
    console.log('--------------1111-----------');
    return h("div", {}, [
      h("div", {}, "你好"),
      h(
        Child,
        {
          msg: "your name is child",
        },
        {
          default: ({ age }) => [
            h("p", {}, "我是通过 slot 渲染出来的第一个元素 "),
            h("p", {}, "我是通过 slot 渲染出来的第二个元素"),
            h("p", {}, `我可以接收到 age: ${age}`),
          ],
        }
      ),
    ]);
  },
};
