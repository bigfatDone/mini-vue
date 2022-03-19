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

## nextTick

用promise来声明，主要是为了让里面的内容作为微任务执行，这样就会让同步执行的render任务先执行，后面的nextTick再加载。

## mountedElement

会首先根据type创建el，然后将props里面的参数都set到el上面。shapeFlag为element的的children会有两种情况一种是text，说明就是文字，直接set进dom就可以了。另外一种是array类型，这时候就要对children进行额外的处理了。

## diff算法

1. 从左往右遍历，遇到不同点中断，位置为i

2. 从右往左遍历，e--，遇到不同点中断，位置为e1和e2

3. e1 < i <= e2, 全为新增child； e2 < i <= e1, 全为旧的child

4. 中间剩下的就是换了位置。

   - 获取新child的下标和key

   - 优化：设置新child的长度；遍历多的旧child：1.旧的有，但是新的没有，删除了；2.新旧的都有，就拿出这两个child进行比较。

   - 遍历新child，找出旧的没有值，新的有值。说明是新增的。

## 非diff算法

- 只对最小公共长度的进行patch
- 旧child长于新child，直接卸载
- 旧child短于新child，直接mounted
- 好暴力呀，我以为有什么可以优化判断的