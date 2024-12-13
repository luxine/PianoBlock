import { useGameStore } from "@/stores/useGameStore";

/**
 * 创建一个IntersectionObserver实例来观察目标元素的可见度变化
 * 当目标元素的可见度达到或超过90%时，触发滑动到下一个元素的事件
 * 当目标元素完全不可见时，可选地执行一些操作（当前代码中为打印日志）
 */
const gameStore = useGameStore();
export const sliderObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // 当元素的可见度达到或超过93%时，触发滑动到下一个元素的事件
        if (entry.intersectionRatio >= 0.93) {
            if (entry.target.classList.contains('slider')) {
                window.eventEmitter.$emit("slider:next")
                return
            }
            
            if((gameStore.getTrackListMap().findIndex((item:any)=>item.SliderUID === gameStore.getNewSliderId().value.sliderID))
                 === gameStore.getTrackListMap().length-1){
                    window.eventEmitter.$emit("slider:next")
                    return
            }
            console.log("当前总数组",gameStore.getTrackListMap());
            console.log("当前最新块id",gameStore.getNewSliderId().value.sliderID);
            
            console.log("当前白块在总数组中的位置",gameStore.getTrackListMap().findIndex((item:any)=>item.SliderUID === gameStore.getNewSliderId().value.sliderID));
            console.log("当前数组总长度",gameStore.getTrackListMap().length-1);
            
        }
        // 当元素完全不可见时，可选地执行一些操作
        if (entry.intersectionRatio <= 0) {
            window.eventEmitter.$emit("slder:hide", entry.target);
            sliderObserver.unobserve(entry.target);
        }
    });
}, { threshold: [0, 0.93] });
