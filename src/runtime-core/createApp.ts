import { createVNode } from "./vnode";

/**
 * 
 * 触发流程
 * 1. 获取rootComponent数据，这个是一个组件的实例
 * 2. 获取id选择器
 * 3. 将组件的实例创建vnode
 * 4. 将vnode和选择器渲染到页面中
 */
export function createAppAPI(render) {
  // 这里返回的是函数，有没有名字是无所谓的（这里的名字为了添加描述）
  // 一个组件实例，rootComponent
  return function createApp(rootComponent) {
    const app = {
      _component: rootComponent,
      mount(rootContainer) {
        console.log("基于根组件创建 vnode");
        const vnode = createVNode(rootComponent);
        console.log("调用 render，基于 vnode 进行开箱");
        render(vnode, rootContainer);
      },
    };

    return app;
  };
}
