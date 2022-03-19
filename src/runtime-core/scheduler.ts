// 收集的微任务队列
const queue: any[] = [];

const p = Promise.resolve();
let isFlushPending = false;

export function nextTick(fn) {
  return fn ? p.then(fn) : p;
}

// 排队作业，添加执行
export function queueJob(job) {
  if (!queue.includes(job)) {
    queue.push(job);
    // 执行所有的 job
    queueFlush();
  }
}

function queueFlush() {
  // 如果同时触发了两个组件的更新的话
  // 这里就会触发两次 then （微任务逻辑）
  // 但是着是没有必要的
  // 我们只需要触发一次即可处理完所有的 job 调用
  // 所以需要判断一下 如果已经触发过 nextTick 了（注：触发不等于执行，因为是微任务）
  // 那么后面就不需要再次触发一次 nextTick 逻辑了
  if (isFlushPending) return;
  // 用于标志job是否在执行队列中，如果是，则不继续添加
  // 因为执行是微任务，需要等待同步任务先执行
  isFlushPending = true;
  nextTick(flushJobs);
}

// 执行清空任务队列
function flushJobs() {
  isFlushPending = false;
  let job;
  while ((job = queue.shift())) {
    if (job) {
      job();
    }
  }
}
