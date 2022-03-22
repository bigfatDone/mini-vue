import { computed, ref, isRef } from "../../lib/mini-vue.esm.js"
export default {
  template: `<p>{{msg}}{{b.value}}</p>`,
  setup() {
    let a = 19
    // computed内部的变量要绑定响应式才行，才能出发依赖更新
    // let a = ref(19)
    let b = computed(() => {
      return a + 18
    })
    console.log(b.value);
    a = 82
    let c = ref(88)
    console.log(b.value);
    console.log(isRef(c));
    console.log('--------------分割线------------');
    return {
      msg: "vue3 - compiler",
      b
    };
  },
};
