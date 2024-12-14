import { useGameStore } from "@/stores/useGameStore";
// 留的拓展按键接口,后期可以新增别的功能
const gameStore = useGameStore()
export const handleKey = (e: KeyboardEvent) => {
    console.log(e);
}