<template>
    <div>
        <div class="el-row">
            <el-row :gutter="5">
                <el-col class="hidden-xs-and-down" :sm="6" :md="6" :lg="8" :xl="8"></el-col>
                <el-col v-for="(track, trackIndex) in tarckList" :key="trackIndex" :xs="6" :sm="3" :md="3" :lg="2"
                    :xl="2">
                    <div class="item1">
                        <template v-for="(item, index) in track.value" :key="item.id">
                            <div :ref="el => sliderRefsList[trackIndex].value[index] = el"
                                @click="handleSliderClick(trackIndex, index)" class="slider"></div>
                        </template>
                    </div>
                </el-col>

                <el-col class="hidden-xs-and-down" :sm="6" :md="6" :lg="8" :xl="8"></el-col>
            </el-row>
        </div>

        <div class="start">
            <el-button v-show="gameShow" color="#F56C6C" type="warning" round auto-insert-space @click="settingGame"
                class="start-btn"><span class="startFont" style="color: aliceblue;">游戏设置</span></el-button>
            <el-button v-show="gameShow" color="#626aef" type="primary" round auto-insert-space @click="startGame"
                class="start-btn"><span class="startFont">开始游戏</span></el-button>
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
import { onMounted, ref, watch } from "vue";
import { useGameStore } from "@/stores/useGameStore";
import { startAnime } from "@/sliderClass/anime";
import 'element-plus/theme-chalk/display.css'
import GameOver from "@/components/gameState/GameOver.vue";
import Setting from "@/components/gameState/Setting.vue";
// 初始化游戏仓库
const gameStore = useGameStore();

// 获取轨迹列表和滑块引用列表
let tarckList = gameStore.getTrackList();
let sliderRefsList = gameStore.getSliderRefs();
let gameShow = ref(true);
let gameOverShow = ref(false);
let settingShow = ref(false)
let intger = ref(0)

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
    // 检查点击的滑块是否为当前可消除的滑块
    if (trackIndex === eliminableSlider.trackindex && eliminableSlider.trackData[index].SliderUID === eliminableSlider.sliderID) {
        // 设置对应滑块的 hidden 属性为 true,并移除该滑块
        gameStore.removeEliminableSlider();
        sliderRefsList[trackIndex].value[index].hidden = true;
        gameStore.addIntger()
        intger.value = gameStore.getIntger()
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
    window.eventEmitter.$emit('game:init')
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

    // 注册游戏初始化事件
    window.eventEmitter.$on('game:init', () => {
        let setting = gameStore.getGameSetting().value;
        gameStore.setGlobalCssVar('--track-color', setting.color)
    })
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
