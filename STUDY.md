# mini-vue学习总结

## 入口

位于rumtime-dom的index.js，里面会暴露createApp方法用于创建vue，通过ensureRenderer来确保render能够正确创立。

node就是指`export default {}`出来的一个实例,

vnode就是将component转成某个格式的数据

## h

h函数就是创建vnode

```js
function h(type, props, children) {
  return createVnode(type, props, children)
}
```

## emit

emit函数式绑定了当前instance，遇到触发emit就会去props里面查找是否有绑定这个字段名（烤肉串和驼峰命名都要兼容），如果匹配上则执行这个事件。

```js
emit(instance, name, ...raws) {
  let { props } = instance
  let handle = props[name]
  if (handle) {
    // 执行props上面匹配的事件
    handle(...rags)
  }
}
```

## 初始化插槽

通过将shapeFlag为slots格式的子节点，具体经过编译之后变成了下面，以键值对的形式

```js
h(
  Child,
  {
    msg: "your name is child",
  },
  {
    default: ({ age }) => [ // 这个是子节点
      h("p", {}, "我是通过 slot 渲染出来的第一个元素 "),
      h("p", {}, "我是通过 slot 渲染出来的第二个元素"),
      h("p", {}, `我可以接收到 age: ${age}`),
    ],
    tets: () => {}
  }
),
```

在子组件调用这些插槽的时候，通过了renderSlot函数执行收集起来的slots，因为在初始化组件的时候，instance.slots就将当前页面的slots收集了起来。

## setup

会执行setup函数，并且将参数也指定了。返回值会对ref进行自动解构，通过设置setCurrentInstance来外暴当前实例。果然return一个函数则认为是render函数

- todo:

  - setup内部的生命周期钩子函数

## component中的render

判断有没有组件内部有没有render，有的话则直接赋予，没有的情况就要判断有没有template，就会将template进行compile，生成render。

## update

收集effect，将组件的挂载更新逻辑写在里面，一旦触发了update就会去patch新旧节点，将数据渲染到页面上去。
