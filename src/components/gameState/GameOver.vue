<template>
    <el-card style="min-width: 400px;min-height: 150px;">
        <template #header>
            <span class="title">游戏结束</span>
        </template>
        <div class="gameover">
            <div class="score">
                <span>您的积分为：<span style="color: sandybrown;">{{ intger }}</span></span>
                <span>历史最高为：<span style="color: red;">{{ maxIntger }}</span></span>
            </div>
        </div>

        <template #footer>
            <div class="footer">
                <el-button type="primary" @click="cancel">回到首页</el-button>
                <el-button type="primary" @click="reGame">重新游戏 (Enter)</el-button>
            </div>
        </template>
    </el-card>
</template>

<script setup lang="ts">
// 导入 Vue 的响应式和事件发射功能，以及游戏存储库
import { ref, defineEmits } from "vue"
import { useGameStore } from "@/stores/useGameStore";

// 初始化游戏存储库
const gameStore = useGameStore()

// 定义事件发射器，用于发出重新游戏和取消事件
const emit = defineEmits(['reGame', "cancel"])

// 从游戏存储库中获取当前的整数值
const intger = gameStore.getIntger()

// 从游戏存储库中获取最大的整数值
const maxIntger = gameStore.getMaxIntger()

/**
 * 发出重新游戏事件的函数
 */
const reGame = () => {
    emit('reGame')
}

/**
 * 发出取消事件的函数
 */
const cancel = () => {
    emit('cancel')
}
</script>

<style lang="scss" scoped>
.gameover {
    font-size: 20px;
    text-align: center;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    .score{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
    }
}

.title {
    font-size: 30px;
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
}

.footer {
    display: flex;
    justify-content: space-between;
}
</style>
