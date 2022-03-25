[CN](README.md) / [EN](README_EN.md)

## mini-vue  [![github](https://img.shields.io/badge/%E5%82%AC%E5%AD%A6%E7%A4%BE-mini--vue-blue)](https://github.com/cuixiaorui/mini-vue)

实现最简 vue3 模型，用于深入学习 vue3， 让你更轻松的理解 vue3 的核心逻辑

## Usage

[B 站](https://www.bilibili.com/video/BV1Zy4y1J73E) 提供了视频讲解使用方式

历经半年我把这个项目做成了一套系列视频课

[【Vue3源码实战课 - 手把手带你实现自己的Vue3】](https://cua.h5.xeknow.com/s/xDWLc)

课程的目标是通过构建自己的 mini-vue3 （同这个库一个复杂级别）来深入学习理解 vue3 源码

只有手写一遍，才能真正的掌握源码

vx：cuixr1314

备注一下： github mini-vue

## Why

当我们需要深入学习 vue3 时，我们就需要看源码来学习，但是像这种工业级别的库，源码中有很多逻辑是用于处理边缘情况或者是兼容处理逻辑，是不利于我们学习的。

我们应该关注于核心逻辑，而这个库的目的就是把 vue3 源码中最核心的逻辑剥离出来，只留下核心逻辑，以供大家学习。

## How

基于 vue3 的功能点，一点一点的拆分出来。

代码命名会保持和源码中的一致，方便大家通过命名去源码中查找逻辑。

### Tasking

#### runtime-core

- [x] 支持组件类型 --创建组件，并且通过update函数收集更新渲染页面
- [x] 支持 element 类型 --对txtchild和arraychild进行处理，diff算法优化
- [x] 初始化 props --渲染函数的props属性
- [x] setup 可获取 props 和 context --传进实例的属性
- [x] 支持 component emit --匹配props的事件属性
- [x] 支持 proxy --使用proxy代理instance
- [x] 可以在 render 函数中获取 setup 返回的对象 --ref类型自动结构
- [x] nextTick 的实现 --通过触发微任务执行cb
- [x] 支持 getCurrentInstance --setup内部
- [x] 支持 provide/inject --通过getCurrentInstance给provides对象添加属性
- [x] 支持最基础的 slots --子节点为slots，对象函数，匹配对应的事件
- [x] 支持 Text 类型节点 --对比文本内容，进行更新
- [x] 支持 $el api --在instance的proxy时候，在get操作进行拦截部分$开头字段，赋予当前实例的内部属性


#### reactivity

目标是用自己的 reactivity 支持现有的 demo 运行

- [x] reactive 的实现 --对象代理，收集被代理过的对象（优化）
- [x] ref 的实现 --类声明对value的get和set操作,输入object，这用reactive
- [x] readonly 的实现 --只有读get操作，没有依赖收集
- [x] computed 的实现 --调用computed就执行effect中的run(传入的回调函数)
- [x] track 依赖收集 --在get操作上就会对数据进行track[用到effect或者ReactiveEffect声明的]
- [x] trigger 触发依赖 --更改数据进入get方法，触发之前收集到的effect[用到effect或者ReactiveEffect声明的]
- [x] 支持 isReactive --判断handler函数的isReadoly参数
- [x] 支持嵌套 reactive --判断get操作，如果object类型，则继续reactive
- [x] 支持 toRaw --没有经过proxy代理的原始数据
- [x] 支持 effect.scheduler -- 这个调度器用来执行额外的run(),里面可以写一些其他的逻辑
- [x] 支持 effect.stop -- 从dep中删除effect(一个响应式实例)
- [x] 支持 isReadonly --判断handler函数的isReadlonly参数
- [x] 支持 isProxy --调用isReactive和isReadoly方法
- [x] 支持 shallowReadonly --set操作只能代理第一层，对更加深层级的set是拦截不了的，只能在get操作上拦截对象，重新reactive。
- [x] 支持 proxyRefs --自动解构
- [x] proxy触发set操作，只能拦截第一层操作

### compiler-core
- [x] 解析插值
- [x] 解析 element
- [x] 解析 text

### runtime-dom
- [x] 支持 custom renderer 

### build

```shell
yarn build
```

### example

通过 server 的方式打开 example/\* 下的 index.html 即可

>  推荐使用 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### 初始化

#### 流程图
![初始化流程图](https://user-images.githubusercontent.com/12064746/138114565-3e0eecbb-7fd0-4203-bf36-5e5fd8003ce0.png)


#### 关键函数调用图


![关键函数调用图2](https://user-gold-cdn.xitu.io/2020/6/22/172dc08840e25b42?w=1816&h=934&f=png&s=550722)

> 可以基于函数名快速搜索到源码内容

### update

#### 流程图

![image](https://user-images.githubusercontent.com/12064746/138115157-1f4fb8a2-7e60-412d-96de-12e68eb0288c.png)

#### 关键函数调用图

![image](https://user-images.githubusercontent.com/12064746/138114969-9139e4af-b2df-41b2-a5d9-069d8b41903c.png)


> 可以基于函数名快速搜索到源码内容

