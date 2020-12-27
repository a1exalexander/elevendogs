import Hammer from 'hammerjs';

const directiveCallback = (binding = () => undefined) => {
  if (typeof binding?.value !== 'function') return () => undefined;
  return binding?.value;
};

export const swipe = {
  UP: 'UP',
  DOWN: 'DOWN',
  OFFSET: 200,
};

export const swipeDirective = {
  mounted(el, binding) {
    const $el = el;
    const callback = directiveCallback(binding);
    $el.hammertime = new Hammer(el);
    $el.hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    $el.hammertime.on('swipeup', (ev) => callback(swipe.UP, ev));
    $el.hammertime.on('swipedown', (ev) => callback(swipe.DOWN, ev));
  },
  beforeUnmount(el, binding) {
    const hammertime = el?.hammertime;
    if (hammertime) {
      const callback = directiveCallback(binding);
      hammertime.destroy();
      hammertime.off('swipeup', (ev) => callback(swipe.UP, ev));
      hammertime.off('swipedown', (ev) => callback(swipe.DOWN, ev));
    }
  },
};

const wheelEventListener = (el, callback) => (e) => {
  const $el = el;
  const delta = Math.round(e.wheelDelta / 100) * 100;
  const canWheel = delta !== $el.lastWheelValue;
  const resetTimer = () => {
    clearTimeout($el.timer);
    $el.timer = setTimeout(() => {
      $el.lastWheelValue = 0;
    }, 1000);
  };
  if (delta === swipe.OFFSET && canWheel) {
    $el.lastWheelValue = delta;
    resetTimer();
    callback(swipe.UP, e);
  } else if (delta === -swipe.OFFSET && canWheel) {
    $el.lastWheelValue = delta;
    resetTimer();
    callback(swipe.DOWN, e);
  }
};

export const wheelDirective = {
  mounted(el, binding) {
    const $el = el;
    const callback = directiveCallback(binding);
    $el.lastWheelValue = 0;
    $el.timer = null;
    window.addEventListener('mousewheel', wheelEventListener($el, callback), false);
  },
  beforeUnmount(el, binding) {
    const $el = el;
    const callback = directiveCallback(binding);
    $el.lastWheelValue = 0;
    window.removeEventListener('mousewheel', wheelEventListener($el, callback), false);
  },
};
