// 导入事件发射器和路由模块
import { eventEmitter } from ".";
import { useGameStore } from "@/stores/useGameStore";

/**
 * 初始化本地存储相关事件的函数
 */
const _localEvent = () => {
  // 监听本地存储设置事件
  eventEmitter.$on("local:set", (data: { [key: string]: any }) => {
    try {
      // 将数据序列化为JSON字符串并保存到本地存储
      Object.keys(data).forEach((key) => {
        data[key] = JSON.stringify(data[key]);
        localStorage.setItem(key, data[key]);
      });
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  });

  // 监听本地存储获取事件
  eventEmitter.$on("local:get", (key: string) => {
    try {
      // 从本地存储获取数据并反序列化为JavaScript对象
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error("Error parsing from localStorage", error);
      return null;
    }
  });

  // 监听本地存储移除事件
  eventEmitter.$on("local:remove", (key: string) => {
    localStorage.removeItem(key);
  });

  // 监听本地存储清空事件
  eventEmitter.$on("local:clear", () => {
    localStorage.clear();
  });
}

/**
 * 监听滑块事件的函数
 * 该函数主要用于监听滑块组件发出的事件，并根据事件执行相应的逻辑
 */
const _SliderEvent = () => {
  // 获取游戏状态管理实例
  const gameStore = useGameStore();

  // 监听"slider:next"事件，当滑块触发下一个位置时调用
  eventEmitter.$on("slider:next", () => {
    // 随机推送轨迹列表，更新游戏状态
    gameStore.randomPushTrackList()
  })

 // 触发延迟事件,但是目前没有实现相应功能
  eventEmitter.$on("slider:dely", () => {
    gameStore.delyGame()
  })

  // 监听"slider:hide"事件，当滑块隐藏时调用
  // isCheck参数用于控制是否开启滑块校验，默认为true
  // el 参数表示滑块元素
  window.eventEmitter.$on('slider:hide', (el, isCheck = true) => {
    if (!isCheck) {
      return
    }
    // 如果滑块元素是白色滑块，则不执行任何操作
    if (el.classList.contains('white-slider')) {
      return
    }
    // 如果滑块元素被隐藏，则不执行任何操作
    if (el.hidden) {
      return
    }
    // 发送"game:over"事件，通知游戏结束
    window.eventEmitter.$emit("game:over")
  })

  // 监听"game:speedUP"事件，当游戏速度增加时调用
  window.eventEmitter.$on('game:speedUP', () => {
    const setting = gameStore.getGameSetting().value
    if (setting.difficulty >= 1400) {
      setting.difficulty = Number(setting.difficulty) - 20
      gameStore.setGameSetting(setting)
    }
  })
}

/**
 * 初始化函数，用于设置事件监听器
 */
export const initEvent = () => {
    _localEvent(),
    _SliderEvent()
}