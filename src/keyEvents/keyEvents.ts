import { useGameStore } from "@/stores/useGameStore";

const gameStore = useGameStore()
export const handleKey = (e: KeyboardEvent,tarckList:any[],sliderRefsList:any[],intger:any) => {
    let trackIndex = gameStore.getEliminableSlider()?.value.trackindex
    let sliderID = gameStore.getEliminableSlider()?.value.sliderID
    if (e.key === "a") {
        if (trackIndex === 0) {
            // 设置对应滑块的 hidden 属性为 true,并移除该滑块
            gameStore.removeEliminableSlider();
            const slider = tarckList[trackIndex].value.findIndex((element:any) => element.SliderUID === sliderID);
            if (slider>=0) {
                sliderRefsList[trackIndex].value[slider].hidden = true;
            }
            gameStore.addIntger()
            intger.value = gameStore.getIntger()
        }
    } else if (e.key === "s") {
        if (trackIndex === 1) {
            gameStore.removeEliminableSlider();
            const slider = tarckList[trackIndex].value.findIndex((element:any) => element.SliderUID === sliderID);
            if (slider>=0) {
                sliderRefsList[trackIndex].value[slider].hidden = true;
            }
            gameStore.addIntger()
            intger.value = gameStore.getIntger()
        }
    } else if (e.key === "k") {
        if (trackIndex === 2) {
            gameStore.removeEliminableSlider();
            const slider = tarckList[trackIndex].value.findIndex((element:any) => element.SliderUID === sliderID);
            if (slider>=0) {
                sliderRefsList[trackIndex].value[slider].hidden = true;
            }
            gameStore.addIntger()
            intger.value = gameStore.getIntger()
        }
    } else if (e.key === "l") {
        if (trackIndex === 3) {
            gameStore.removeEliminableSlider();
            const slider = tarckList[trackIndex].value.findIndex((element:any) => element.SliderUID === sliderID);
            if (slider>=0) {
                sliderRefsList[trackIndex].value[slider].hidden = true;
            }
            gameStore.addIntger()
            intger.value = gameStore.getIntger()
        }
    }
}