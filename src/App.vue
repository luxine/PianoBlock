<template>
    <div>
        <el-config-provider :locale="zhCn">
            <router-view class="router-view"></router-view>
        </el-config-provider>
    </div>

</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<style scoped>
.router-view {
    width: 100%;
    height: 100%;
}
</style>
