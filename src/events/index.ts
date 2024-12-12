/**
 * 定义一个回调函数类型，可以接受任意数量的参数并返回任意类型的值
 */
type callback = (...args: any[]) => any

/**
 * 实现一个事件发射器类，用于管理事件的订阅和触发
 */
class EventEmitter {
    // 存储事件名称与对应回调函数数组的映射
    private _events: { [key: string]: callback[] }
    
    // 标记是否已经创建了实例
    private static isInstantiated: boolean = false
    
    // 存储单例实例
    private static instance: EventEmitter | null
    
    // 私有构造函数，限制外部直接创建实例
    private constructor() {
        this._events = {}
    }

    /**
     * 获取指定事件名对应的回调函数数组
     * @param eventName 事件名称
     */
    $getEvent(eventName: string){
        return this._events[eventName]
    }

    /**
     * 删除指定事件名对应的回调函数数组
     * @param eventName 事件名称
     */
    $deleteEvent(eventName: string){
        delete this._events[eventName]
    }

    /**
     * 注册一个只触发一次的事件监听器
     * @param eventName 事件名称
     * @param callback 回调函数
     * @param args 传递给回调函数的参数
     */
    $once(eventName: string, callback: callback,...args: any[]) {
        this.$on(eventName, callback)
        this.$emit(eventName,...args)
        this.$off(eventName, callback)
        return this
    }

    /**
     * 注册一个事件监听器
     * @param eventName 事件名称
     * @param callback 回调函数
     */
    $on(eventName: string, callback: callback) {
        if (this._events[eventName]) {
            this._events[eventName].push(callback)
        } else {
            this._events[eventName] = [callback]
        }
    }

    /**
     * 触发指定事件，调用其所有注册的回调函数
     * @param eventName 事件名称
     * @param args 传递给回调函数的参数
     * @returns 回调函数返回值的数组
     */
    $emit(eventName: string, ...args: any[]): any {
        if (!this._events[eventName]) {
            throw new Error(`事件 ${eventName} 未定义`)
        }
        let _vL = this._events[eventName].map(callback => {
            let _v = callback(...args)
            return _v
        })
        return _vL
    }

    /**
     * 移除指定事件的一个监听器
     * @param eventName 事件名称
     * @param callback 要移除的回调函数
     */
    $off(eventName: string, callback: callback): void {
        if (!this._events[eventName]) {
            throw new Error(`事件 ${eventName} 未定义`)
        }

        const index = this._events[eventName].indexOf(callback)
        if (index === -1) {
            throw new Error(`事件 ${eventName} 未绑定该回调函数`)
        }
        this._events[eventName].splice(index, 1)
    }

    /**
     * 获取单例实例
     * @returns EventEmitter的实例
     */
    static getInstance(): EventEmitter {
        return this.instance || this.create();
    }

    /**
     * 创建单例实例
     * @returns EventEmitter的新实例
     */
    static create(): EventEmitter {
        if (!this.isInstantiated) {
            this.isInstantiated = true;
            this.instance = new EventEmitter();
        }
        return this.instance!;
    }
}

// 导出一个事件发射器的单例实例
export const eventEmitter = EventEmitter.getInstance()