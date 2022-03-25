import { shallowReadonly, reactive } from "../../lib/mini-vue.esm.js"
export default {
  template:`<h2>{{msg.obj.bb}}</h2>`,
  setup() {
    const msg = reactive({
      name: 'zys',
      obj: {
        age: 18
      }
    })
    msg.obj = {
      bb: 89
    }
    console.log(msg.obj);
    return { msg }
  },
};
