import { ref, computed, useId, type Ref } from 'vue'
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

  let isStart = ref(false)

  let trackListMap: any[] = []
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
    difficulty: 3000,
    trackColor: '#E4E7ED',
    sliderColor: "#000204"
  })

  // 定义一个引用，用于存储最新创建的滑块信息
  const upToDateSlider = ref<any>(null);

  // 定义一个链表节点，用于管理可删除的滑块
  const eliminableSlider = new LinkedListNode<any>();

  /**
   * 获取游戏设置的方法
   * @returns {ref} 包含游戏设置的引用
   */
  const getGameSetting = (): Ref => {
    return gameSetting
  }

  /**
   * 设置游戏设置的方法
   * @param {object} obj - 新的游戏设置对象
   */
  const setGameSetting = (obj: any) => {
    gameSetting.value = obj
    setGlobalCssVar('--track-color', getGameSetting().value.trackColor)
    setGlobalCssVar('--slider-color', getGameSetting().value.sliderColor)
  }

  /**
   * 创建滑块的方法
   * 生成唯一ID
   * @returns {object} 包含滑块唯一ID的对象
   */
  const buildSlider = (): { SliderUID: string, isClick: number } => {
    const newId = generateUID();
    const ranInt = Math.floor(Math.random() * 11);
    let isClick = 1
    if (ranInt === 8) {
      isClick = 0
      return { SliderUID: newId, isClick }
    }
    return { SliderUID: newId, isClick }
  };

  /**
   * 获取是否游戏中的方法
   * @returns {boolean} 是否开始游戏
   */
  const getIsStart = () => {
    return isStart
  }
  /**
   * 设置全局CSS变量的方法
   * @param {string} variableName - CSS变量名
   * @param {string} value - CSS变量值
   */
  const setGlobalCssVar = (variableName: any, value: any) => {
    const root = document.documentElement;
    root.style.setProperty(variableName, value);
  }

  // 获取轨道所有滑块信息的方法
  const getTrackListMap = () => {
    return trackListMap
  }

  /**
   * 清空轨道所有滑块信息的方法
   */
  const clearTrackListMap = () => {
    trackListMap = []
  }
  /**
   * 检查是否是最大积分的方法
   * @returns {boolean} 是否是最大积分
   */
  const ifIntgerMax = (): boolean => {
    const tempMaxIntger = getMaxIntger()
    const tempIntger = getIntger()
    if (tempIntger > tempMaxIntger) {
      maxIntger.value = tempIntger
      setMaxIntger()
      return true;
    }
    return false;
  }
  /**
   * 增加积分的方法，同时更新最大整数
   * @returns {number} 更新后的积分
   */
  const addIntger = (): number => {
    intger.value++
    ifIntgerMax()

    const flag = intger.value % 10 === 0
    if (flag) {
      window.eventEmitter.$emit("game:speedUP")
    }
    return intger.value
  }

  /**
   * 获取积分的方法
   * @returns {number} 当前的积分
   */
  const getIntger = (): number => {
    return intger.value
  }

  /**
   * 清零积分的方法
   */
  const clearIntger = () => {
    intger.value = 0
  }

  /**
   * 获取可删除滑块链表的方法
   * @returns {LinkedListNode} 可删除滑块链表
   */
  const getEliminableSliderLinkedList = () => {
    return eliminableSlider
  }
  /**
   * 获取最高积分的方法
   * @returns {number} 最高积分
   */
  const getMaxIntger = (): number => {
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
  const getSliderRefs = (): Array<any> => {
    return [track_1_SliderRefs, track_2_SliderRefs, track_3_SliderRefs, track_4_SliderRefs]
  }


  /**
   * 延迟游戏处理函数
   * 该函数的主要目的是根据一定的条件修改游戏的轨道列表和滑块引用
   */
  const delyGame = () => {
    window.eventEmitter.$emit("slder:hide",undefined,false)
    // 暂时未实现相关功能
  }
  /**
   * 随机向一个轨道列表中添加滑块的方法
   * 生成一个随机索引，用于选择轨道列表，并在选中的列表中添加一个新滑块
   */
  const randomPushTrackList = () => {
    const ranInt = Math.floor(Math.random() * getTrackList().length);
    const slider = buildSlider();
    getTrackList()[ranInt].value.push(slider);
    trackListMap.push(slider)
    // 获取新滑块的ID和所在轨道的信息
    const sliderID = getTrackList()[ranInt].value[getTrackList()[ranInt].value.length - 1].SliderUID;
    const trackData = getTrackList()[ranInt]


    if (slider.isClick === 0) {
      // 更新最新滑块信息
      upToDateSlider.value = {
        sliderID,
        trackData: trackData.value,
        trackindex: ranInt,
        isClick: 0
      }
      return
    }

    // 将新滑块添加到可删除滑块链表中
    eliminableSlider.push({
      sliderID: sliderID,
      trackData: trackData.value,
      trackindex: ranInt
    })


    // 更新最新滑块信息
    upToDateSlider.value = {
      sliderID,
      trackData: trackData.value,
      trackindex: ranInt,
      isClick: 1
    }
  }

  /**
   * 获取最新创建的滑块ID的方法
   * @returns {ref} 包含最新滑块信息的引用
   */
  const getNewSliderId = (): Ref => {
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
    isStart.value = true
    clearIntger()
    randomPushTrackList()
  }

  /**
   * 调整游戏难度
   * 
   * 本函数根据当前的游戏难度设置，将难度调整到最接近的预设难度值
   * 这是为了确保游戏难度在一个合理的范围内，同时简化难度管理
   */
  const setDifficulty = () => {
    // 获取当前的游戏难度设置
    const difficulty = getGameSetting().value.difficulty;

    // 根据当前难度，调整到最接近的预设难度值
    if (difficulty <= 4000 && difficulty > 3000) {
      getGameSetting().value.difficulty = 4000;
    } else if (difficulty <= 3000 && difficulty > 2500) {
      getGameSetting().value.difficulty = 3000;
    } else if (difficulty <= 2500 && difficulty > 1800) {
      getGameSetting().value.difficulty = 2500;
    } else {
      getGameSetting().value.difficulty = 1800;
    }
  }
  /**
   * 游戏结束的方法
   * 清空所有轨道列表和滑块引用，重置可删除滑块链表
   */
  const gameOver = () => {
    setDifficulty()
    // 清空轨道列表
    // 重新开始游戏
    getTrackList().forEach(track => {
      track.value = []
    })
    getSliderRefs().forEach(slider => {
      slider.value = []
    })
    clearTrackListMap()
    eliminableSlider.clear()
    isStart.value = false
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
    // 游戏结束
    gameOver,
    // 添加积分
    addIntger,
    // 获取积分
    getIntger,
    // 获取最高分
    getMaxIntger,
    // 设置最高分
    setMaxIntger,
    // 重新开始游戏
    reGame,
    // 获取游戏设置
    getGameSetting,
    // 设置游戏设置
    setGameSetting,
    // 设置全局CSS变量
    setGlobalCssVar,
    // 获取可移除滑块链表
    getEliminableSliderLinkedList,
    // 获取是否开始游戏状态
    getIsStart,
    // 获取所有滑块组件的信息
    getTrackListMap,
    // 延迟游戏(未实现)
    delyGame
  }
})