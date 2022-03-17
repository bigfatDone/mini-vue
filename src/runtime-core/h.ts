import { createVNode } from "./vnode";
// h函数实质上市创建一个vnode
export const h = (type: string, props: any, children: string | Array<any>) => {
  return createVNode(type, props, children);
};
