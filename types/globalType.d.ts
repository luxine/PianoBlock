/**
 * 定义一个回调函数类型，可以接受任意数量的参数并返回任意类型的值
 */
type Callback = (...args: any[]) => any;

/**
 * 事件发射器类，用于管理事件的订阅和触发
 */
declare class EventEmitter {
    /**
     * 获取指定事件名对应的回调函数数组
     * @param eventName 事件名称
     */
    $getEvent(eventName: string): Callback[] | undefined;

    /**
     * 删除指定事件名对应的回调函数数组
     * @param eventName 事件名称
     */
    $deleteEvent(eventName: string): void;

    /**
     * 注册一个只触发一次的事件监听器
     * @param eventName 事件名称
     * @param callback 回调函数
     * @param args 传递给回调函数的参数
     */
    $once(eventName: string, callback: Callback, ...args: any[]): this;

    /**
     * 获取所有事件
     * 
     * @returns 所有事件的对象
     */
    $getAllEvents(): object;
    /**
     * 注册一个事件监听器
     * @param eventName 事件名称
     * @param callback 回调函数
     */
    $on(eventName: string, callback: Callback): void;

    /**
     * 触发指定事件，调用其所有注册的回调函数
     * @param eventName 事件名称
     * @param args 传递给回调函数的参数
     * @returns 回调函数返回值的数组
     */
    $emit(eventName: string, ...args: any[]): any[];

    /**
     * 移除指定事件的一个监听器
     * @param eventName 事件名称
     * @param callback 要移除的回调函数
     */
    $off(eventName: string, callback: Callback): void;

    /**
     * 获取单例实例
     * @returns EventEmitter的实例
     */
    static getInstance(): EventEmitter;

    /**
     * 创建单例实例
     * @returns EventEmitter的新实例
     */
    static create(): EventEmitter;
}




declare global {
    interface Window {
      eventEmitter: EventEmitter;
    }
  }

export default {}