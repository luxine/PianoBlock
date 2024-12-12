/**
 * 创建一个IntersectionObserver实例来观察目标元素的可见度变化
 * 当目标元素的可见度达到或超过90%时，触发滑动到下一个元素的事件
 * 当目标元素完全不可见时，可选地执行一些操作（当前代码中为打印日志）
 */

export const sliderObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // 当元素的可见度达到或超过93%时，触发滑动到下一个元素的事件
        if (entry.intersectionRatio >= 0.93) {
                window.eventEmitter.$emit("slider:next")
        }
        // 当元素完全不可见时，可选地执行一些操作
        if (entry.intersectionRatio <= 0) {
            window.eventEmitter.$emit("slder:hide",entry.target);
            sliderObserver.unobserve(entry.target);
        }
    });
}, { threshold: [0,0.93]});
