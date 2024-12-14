<template>
    <div>
        <div class="el-row" @keydown.capture="handleKey">
            <el-row :gutter="5">
                <el-col class="hidden-xs-and-down" :sm="6" :md="6" :lg="8" :xl="8"></el-col>
                <el-col v-for="(track, trackIndex) in tarckList" :key="trackIndex" :xs="6" :sm="3" :md="3" :lg="2"
                    :xl="2">
                    <div class="item1">
                        <template v-for="(item, index) in track.value" :key="item.SliderUID">
                            <div v-if="item.isClick === 1" :ref="el => sliderRefsList[trackIndex].value[index] = el"
                                @mousedown="handleSliderClick(trackIndex, index)" class="slider"></div>
                            <div v-if="item.isClick === 0" :ref="el => sliderRefsList[trackIndex].value[index] = el"
                                @mousedown="handleSliderClick(trackIndex, index)" class="white-slider"></div>
                        </template>
                    </div>
                </el-col>

                <el-col class="hidden-xs-and-down" :sm="6" :md="6" :lg="8" :xl="8"></el-col>
            </el-row>
        </div>

        <div class="start">
            <el-button v-show="gameShow" color="#F56C6C" type="warning" round auto-insert-space
                @mouseover="settingHover = true" @mouseleave="settingHover = false" @click="settingGame"
                class="start-btn">
                <el-icon size="20" color="white" :class="settingHover ? 'is-loading' : null">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                        <path fill="currentColor"
                            d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384m0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256">
                        </path>
                    </svg>
                </el-icon>
                <span class="startFont" style="color: aliceblue;">游戏设置</span>
            </el-button>

            <el-button v-show="gameShow" color="#626aef" type="primary" round auto-insert-space @click="startGame"
                class="start-btn">
                <el-icon size="20" color="white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                        <path fill="currentColor"
                            d="M624 475.968V640h144a128 128 0 0 1 128 128H128a128 128 0 0 1 128-128h144V475.968a192 192 0 1 1 224 0M128 896v-64h768v64z">
                        </path>
                    </svg>
                </el-icon>
                <span class="startFont">开始游戏</span></el-button>
        </div>

        <div class="gameOver" v-if="gameOverShow">
            <GameOver @re-game="reGame" @cancel="gameOverCancel" />
        </div>

        <div class="intger">
            <div>
                <div class="score"><span>{{ intger }}</span></div>
            </div>
        </div>

        <div class="setting">
            <div class="setting-btn" v-if="settingShow">
                <Setting @cancel="cancelSetting" @confirm="confirmSetting"></Setting>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入 Vue 的钩子和游戏仓库
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useGameStore } from "@/stores/useGameStore";
import { startAnime } from "@/sliderClass/anime";
import 'element-plus/theme-chalk/display.css'
import GameOver from "@/components/gameState/GameOver.vue";
import Setting from "@/components/gameState/Setting.vue";
// 初始化游戏仓库
// 创建游戏仓库实例
const gameStore = useGameStore();

// 获取轨迹列表和滑块引用列表
let tarckList = gameStore.getTrackList();
let sliderRefsList = gameStore.getSliderRefs();

// 控制游戏显示状态的响应式变量
let gameShow = ref(true);
// 控制游戏结束显示状态的响应式变量
let gameOverShow = ref(false);
// 控制设置界面显示状态的响应式变量
let settingShow = ref(false);

// 用于记录游戏得分的响应式变量
let intger = ref(0);

// 用于指示设置按钮悬停状态的响应式变量
let settingHover = ref(false);


// 监视滑块引用列表的变化
watch(() => sliderRefsList, (newValue, oldValue) => {
    // 获取新的滑块ID
    const data = gameStore.getNewSliderId();
    // 启动动画，针对变化后的滑块引用列表中的最后一个元素
    startAnime(sliderRefsList[data.value.trackindex].value[sliderRefsList[data.value.trackindex].value.length - 1]);
}, { deep: true });

/**
 * 处理滑块点击事件
 * 当点击的滑块是可以消除的滑块时，将该滑块设置为隐藏并移除
 * @param {number} trackIndex - 滑块所在的轨迹索引
 * @param {number} index - 滑块在其轨迹中的索引
 */
const handleSliderClick = (trackIndex: number, index: number) => {
    // 获取当前游戏状态中可消除的滑块数据
    const eliminableSlider = gameStore.getEliminableSlider()?.value;
    // 判断当前点击的滑块是否可点击
    const isClick = gameStore.getTrackList()[trackIndex].value[index].isClick
    // 当可消除的滑块列表中只有一个滑块，且该滑块已被点击，并且是最后一个滑块时，执行消除操作
    if (gameStore.getEliminableSliderLinkedList().size() === 1 && isClick &&
        (gameStore.getTrackListMap().findIndex((item: any) => item.SliderUID === tarckList[trackIndex].value[index].SliderUID))
        === gameStore.getTrackListMap().length - 1
    ) {
        // 移除可消除的滑块
        gameStore.removeEliminableSlider();
        // 增加整数计数
        gameStore.addIntger()
        // 更新整数显示值
        intger.value = gameStore.getIntger()
        // 隐藏滑块
        sliderRefsList[trackIndex].value[index].hidden = true;
        // 触发滑块延迟事件
        window.eventEmitter.$emit("slider:dely")
        return
    }

    // 当点击的滑块与可消除的滑块匹配时，执行消除操作
    if (trackIndex === eliminableSlider.trackindex &&
        eliminableSlider.trackData[index].SliderUID === eliminableSlider.sliderID
        && isClick) {
        // 设置对应滑块的 hidden 属性为 true,并移除该滑块
        gameStore.removeEliminableSlider();
        sliderRefsList[trackIndex].value[index].hidden = true;
        // 增加整数计数
        gameStore.addIntger()
        // 更新整数显示值
        intger.value = gameStore.getIntger()
        return
    }

    // 处理游戏结束的情况
    if (!isClick) {
        window.eventEmitter.$emit("game:over")
    }
}



/**
 * 处理移除滑块事件的函数
 * 
 * 此函数旨在从游戏仓库中移除一个可消除的滑块，并更新界面上相应滑块的显示状态
 * 它通过接收的轨道索引和滑块ID来定位并隐藏对应的滑块元素
 * 
 * @param trackIndex 轨道的索引，用于定位滑块所属的轨道
 * @param sliderID 滑块的唯一标识符，用于识别特定的滑块
 */
const keyRemoveHandle = (trackIndex: number, sliderID: number) => {
    // 从游戏仓库中移除一个可消除的滑块
    gameStore.removeEliminableSlider();

    // 在指定轨道中查找匹配滑块ID的滑块元素索引
    const slider = tarckList[trackIndex].value.findIndex((element: any) => element.SliderUID === sliderID);

    // 如果找到了匹配的滑块，则将其隐藏
    if (slider >= 0) {
        sliderRefsList[trackIndex].value[slider].hidden = true;
    }

    // 向游戏仓库中添加一个整数，并更新应用中的整数显示值
    gameStore.addIntger()
    intger.value = gameStore.getIntger()
}
/**
 * 处理键盘事件
 */
const handleKey = (e: KeyboardEvent) => {
    let trackIndex = gameStore.getEliminableSlider()?.value.trackindex
    let sliderID = gameStore.getEliminableSlider()?.value.sliderID
    let isSteart = gameStore.getIsStart().value
    if (e.key === "a" && trackIndex === 0 && isSteart) {
        keyRemoveHandle(trackIndex, sliderID)
        return
    } else if (e.key === "s" && trackIndex === 1 && isSteart) {
        keyRemoveHandle(trackIndex, sliderID)
        return
    } else if (e.key === "k" && trackIndex === 2 && isSteart) {
        keyRemoveHandle(trackIndex, sliderID)
        return
    } else if (e.key === "l" && trackIndex === 3 && isSteart) {
        keyRemoveHandle(trackIndex, sliderID)
        return
    } else if (!isSteart && e.key === "Enter") {
        console.log();
        reGame()
        return
    } else if ((e.key === "a" || e.key === "s" || e.key === "k" || e.key === "l")) {
        window.eventEmitter.$emit("game:over")
    }
}
// 取消设置并返回游戏界面
const cancelSetting = () => {
    settingShow.value = false
    gameShow.value = true
}
// 取消游戏结束状态并返回游戏界面
const gameOverCancel = () => {
    gameOverShow.value = false
    gameShow.value = true
}
// 确认设置并重新开始游戏
const confirmSetting = () => {
    settingShow.value = false
    gameShow.value = true
}
/**
 * 开始游戏
 * 隐藏游戏开始界面并启动游戏
 */
const startGame = () => {
    // 隐藏游戏开始界面
    gameShow.value = false;
    // 启动游戏
    gameStore.startGame();
}

// 进入游戏设置界面
const settingGame = () => {
    settingShow.value = true
    gameShow.value = false
}

// 重新开始游戏
const reGame = () => {
    gameOverShow.value = false;
    gameStore.reGame();
    intger.value = gameStore.getIntger()
}

// 在组件挂载时执行
onMounted(() => {
    // 注册结束事件
    window.eventEmitter.$on('game:over', () => {
        gameOverShow.value = true;
        gameStore.gameOver();
    })
    // 注册键盘事件
    window.addEventListener('keydown', handleKey);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKey);
});
</script>

<style lang="scss" scoped>
.el-row {
    width: 100%;

    .item1 {
        height: 100vh;
        background-color: var(--track-color);
        position: relative;
        overflow: hidden;
        gap: 20px;
    }
}

.start {
    z-index: 20;
    position: absolute;
    bottom: 70px;
    display: flex;
    width: calc(100%);
    justify-content: center;
    gap: 30px;

    .start-btn {
        width: 200px;
        height: 60px;
        font-size: smaller;

        .startFont {
            font-size: 20px;
            font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC',
                'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
        }
    }
}

.gameOver {
    z-index: 20;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.setting {
    z-index: 20;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.intger {
    z-index: 20;
    position: fixed;
    top: 5%;
    left: 50%;
    transform: translate(-50%, -50%);

    .score {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
        font-size: 50px;
        color: #256bce62;
    }
}
</style>
