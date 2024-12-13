<template>
    <el-card style="max-width: 400px;min-height: 200px;">
        <template #header>
            <span class="card-title">游戏设置</span>
        </template>

        <template #default>

            <ElForm :model="from" :inline="true" label-width="auto" label-position="right"
                style="max-width: 400px;min-width: 300px;">
                <el-form-item label="游戏难度">
                    <el-radio-group v-model="from.difficulty">
                        <el-radio :value="4000">人机</el-radio>
                        <el-radio :value="3000">一般</el-radio>
                        <el-radio :value="2500">困难</el-radio>
                        <el-radio :value="1800">地狱</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="轨道颜色">
                    <el-radio-group v-model="from.trackColor">
                        <el-color-picker v-model="from.trackColor" show-alpha />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="钢琴块颜色">
                    <el-radio-group v-model="from.sliderColor">
                        <el-color-picker v-model="from.sliderColor" show-alpha />
                    </el-radio-group>
                </el-form-item>
            </ElForm>
        </template>

        <template #footer>
            <div class="footer">
                <el-button type="primary" @click="cancel">返回</el-button>
                <el-button type="primary" @click="confirm">完成</el-button>
            </div>
        </template>
    </el-card>
</template>

<script setup lang="ts">
// 导入 Vue 的响应式和生命周期钩子，以及游戏存储和lodash库
import { ref, reactive, onMounted, defineEmits } from "vue"
import { useGameStore } from "@/stores/useGameStore"
import _ from "lodash"

// 初始化游戏存储
const gameStore = useGameStore()

// 定义触发自定义事件的方法
const emits = defineEmits(['cancel', "confirm"])

// 创建一个空对象来存储表单数据
const from: any = ref({})

/**
 * 取消操作，触发 'cancel' 事件
 */
const cancel = () => {
    emits('cancel')
}

/**
 * 确认操作，更新游戏设置并触发 'confirm' 事件
 */
const confirm = () => {
    gameStore.setGameSetting(from.value)
    emits('confirm')
}

// 在组件挂载时，初始化表单数据
onMounted(() => {
    // 获取游戏设置并深拷贝给表单数据
    const defineSetting = gameStore.getGameSetting()
    from.value = _.cloneDeep(defineSetting.value)
    if (from.value.difficulty <= 4000 && from.value.difficulty >= 3000) {
        from.value.difficulty = 4000
    } else if (from.value.difficulty <= 3000 && from.value.difficulty > 2500) {
        from.value.difficulty = 3000
    } else if (from.value.difficulty <= 2500 && from.value.difficulty > 1800) {
        from.value.difficulty = 2500
    } else {
        from.value.difficulty = 1800
    }
})
</script>

<style lang="scss" scoped>
.card-title {
    display: flex;
    justify-content: center;
    font-size: 24px;
}

.footer {
    display: flex;
    justify-content: space-between;
}
</style>
