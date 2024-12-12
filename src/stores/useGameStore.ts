import { ref, computed, useId } from 'vue'
import { defineStore } from 'pinia'
import { LinkedListNode, type NodeType } from '@/utils/LinkedList';

/**
 * 定义并导出一个名为useGameStore的store
 * 该store管理游戏中的轨道和滑块相关数据与操作
 */
export const useGameStore = defineStore('gameStore', () => {

  // 定义两个引用，用于存储游戏中的积分和最高积分
  let intger = ref<number>(0)
  let maxIntger = ref<number>(0)

  // 定义四个轨道的列表和滑块引用，每个轨道对应一对列表和滑块引用
  const track_1_list = ref<any>([]);
  const track_1_SliderRefs = ref<any>([]);

  const track_2_list = ref<any>([]);
  const track_2_SliderRefs = ref<any>([]);

  const track_3_list = ref<any>([]);
  const track_3_SliderRefs = ref<any>([]);

  const track_4_list = ref<any>([]);
  const track_4_SliderRefs = ref<any>([]);

  // 定义一个引用，用于存储游戏设置，包括难度和颜色
  const gameSetting = ref({
    difficulty: '3000',
    color: '#E4E7ED'
  })

  // 定义一个引用，用于存储最新创建的滑块信息
  const upToDateSlider = ref<any>(null);

  // 定义一个链表节点，用于管理可删除的滑块
  const eliminableSlider = new LinkedListNode<any>();

  /**
   * 获取游戏设置的方法
   * @returns {ref} 包含游戏设置的引用
   */
  const getGameSetting = () => {
    return gameSetting
  }

  /**
   * 设置游戏设置的方法
   * @param {object} obj - 新的游戏设置对象
   */
  const setGameSetting = (obj: any) => {
    gameSetting.value = obj
  }

  /**
   * 创建滑块的方法
   * 生成唯一ID
   * @returns {object} 包含滑块唯一ID的对象
   */
  const buildSlider = (): object => {
    const newId = generateUID();
    return { SliderUID: newId }
  };

  /**
   * 设置全局CSS变量的方法
   * @param {string} variableName - CSS变量名
   * @param {string} value - CSS变量值
   */
  const setGlobalCssVar = (variableName: any, value: any) => {
    const root = document.documentElement;
    root.style.setProperty(variableName, value);
  }

  /**
   * 增加积分的方法，同时更新最大整数
   * @returns {number} 更新后的积分
   */
  const addIntger = () => {
    maxIntger.value = getMaxIntger()
    intger.value++
    if (intger.value > maxIntger.value) {
      maxIntger.value = intger.value
      setMaxIntger()
    }
    return intger.value
  }

  /**
   * 获取积分的方法
   * @returns {number} 当前的积分
   */
  const getIntger = () => {
    return intger.value
  }

  /**
   * 清零积分的方法
   */
  const clearIntger = () => {
    intger.value = 0
  }

  /**
   * 获取最高积分的方法
   * @returns {number} 最高积分
   */
  const getMaxIntger = () => {
    return window.eventEmitter.$emit("local:get", "maxIntger")[0]
  }

  /**
   * 设置最高积分的方法
   */
  const setMaxIntger = () => {
    let obj = {
      maxIntger: maxIntger.value
    }
    window.eventEmitter.$emit("local:set", obj)
  }

  // 生成滑块唯一ID的函数
  const buildUID = () => {
    let _ = 0;
    return () => {
      _++
      return "SilderID:" + _
    }
  }
  const generateUID = buildUID()

  /**
   * 获取所有轨道列表的方法
   * @returns {array} 包含所有轨道列表的数组
   */
  const getTrackList = (): Array<any> => {
    return [track_1_list, track_2_list, track_3_list, track_4_list]
  }

  /**
   * 获取所有滑块引用的方法
   * @returns {array} 包含所有滑块引用的数组
   */
  const getSliderRefs = () => {
    return [track_1_SliderRefs, track_2_SliderRefs, track_3_SliderRefs, track_4_SliderRefs]
  }

  /**
   * 随机向一个轨道列表中添加滑块的方法
   * 生成一个随机索引，用于选择轨道列表，并在选中的列表中添加一个新滑块
   */
  const randomPushTrackList = () => {
    const ranInt = Math.floor(Math.random() * getTrackList().length);
    getTrackList()[ranInt].value.push(buildSlider());

    // 获取新滑块的ID和所在轨道的信息
    const sliderID = getTrackList()[ranInt].value[getTrackList()[ranInt].value.length - 1].SliderUID;
    const trackData = getTrackList()[ranInt]

    // 更新最新滑块信息
    upToDateSlider.value = {
      sliderID,
      trackData: trackData.value,
      trackindex: ranInt
    }
    // 将新滑块添加到可删除滑块链表中
    eliminableSlider.push({
      sliderID: sliderID,
      trackData: trackData.value,
      trackindex: ranInt
    })
  }

  /**
   * 获取最新创建的滑块ID的方法
   * @returns {ref} 包含最新滑块信息的引用
   */
  const getNewSliderId = () => {
    return upToDateSlider
  }

  /**
   * 获取可删除滑块的头部元素
   * 
   * 此函数用于获取当前可删除滑块队列的头部元素，以便进行进一步的处理
   * 它没有输入参数，并返回滑块队列的头部元素
   */
  const getEliminableSlider = () => {
    return eliminableSlider.getHead()
  }

  /**
   * 移除可删除滑块的头部元素
   * 
   * 此函数用于从可删除滑块队列中移除头部元素，通常用于表示该滑块已被处理或删除
   * 它没有输入参数，移除操作直接在内部执行
   */
  const removeEliminableSlider = () => {
    eliminableSlider.removeAt(0)
  }

  /**
   * 开始游戏的方法
   * 初始化游戏状态，并随机添加一个滑块到轨道上
   */
  const startGame = () => {
    window.eventEmitter.$emit("game:init")
    clearIntger()
    randomPushTrackList()
  }

  /**
   * 游戏结束的方法
   * 清空所有轨道列表和滑块引用，重置可删除滑块链表
   */
  const gameOver = () => {
    // 清空轨道列表
    // 重新开始游戏
    getTrackList().forEach(track => {
      track.value = []
    })
    getSliderRefs().forEach(slider => {
      slider.value = []
    })
    eliminableSlider.clear()
  }

  /**
   * 重新开始游戏的方法
   * 清零积分，并开始游戏
   */
  const reGame = () => {
    clearIntger()
    startGame()
  }

  // 返回一个包含多个功能的方法对象
  return {
    // 随机向轨道列表中添加滑块
    randomPushTrackList,
    // 获取轨道列表
    getTrackList,
    // 获取滑块组件的引用列表
    getSliderRefs,
    // 返回最新的滑块ID
    getNewSliderId,
    // 开始游戏
    startGame,
    // 获取当前可消除的滑块
    getEliminableSlider,
    // 移除可消除的滑块
    removeEliminableSlider,
    gameOver,
    addIntger,
    getIntger,
    getMaxIntger,
    setMaxIntger,
    reGame,
    getGameSetting,
    setGameSetting,
    setGlobalCssVar
  }
})