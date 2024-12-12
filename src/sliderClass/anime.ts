// 导入animejs库，用于创建动画效果
import anime from "animejs";

// 导入sliderObserver对象，用于监听元素的交叉状态
import { sliderObserver } from "@/IntersectionObserver/sliderOvserver";
import { useGameStore } from "@/stores/useGameStore";

const gameStore = useGameStore();
/**
 * 启动动画函数
 * @param {HTMLElement | null} ref - 要应用动画效果的HTML元素引用
 */
export const startAnime = (ref: HTMLElement | null) => {
    // 如果没有提供元素引用，则直接返回，不执行任何操作
    if (!ref) return;
    // 开始监听元素的交叉状态变化
    sliderObserver.observe(ref);
    // 使用animejs库创建动画效果
    anime({
        targets: ref, // 指定动画作用的目标元素
        translateY: '125vh', // 设置元素在垂直方向上移动的距离，这里是120个视口高度
        duration: Number(gameStore.getGameSetting().value.difficulty) ?Number(gameStore.getGameSetting().value.difficulty): 3000, // 设置动画持续时间，单位为毫秒
        easing: 'linear', // 设置动画的速度曲线类型为线性，即匀速运动
        complete: function () {
            // 动画完成时，停止对元素的交叉状态监听
            sliderObserver.unobserve(ref);
        }
    });
};