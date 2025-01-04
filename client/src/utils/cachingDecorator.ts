export default function cachingDecorator(func: Function, time = 10000) {
  let cache = new Map();

  let last_time = new Date();

  return function (x: any) {
    let curr_time = new Date();
    if (curr_time.getMilliseconds() - last_time.getMilliseconds() > time) {
      cache = new Map();
      last_time = curr_time;
    }

    if (cache.has(x)) {
      return cache.get(x);
    }

    let result = func(x);
    cache.set(x, result);

    return result;
  };
}
