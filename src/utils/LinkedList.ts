import { Node } from "./linked-list-models";
import { defaultEquals } from "./default";

/**
 * 定义链表节点的接口。
 * @template T 节点中存储的元素类型。
 */
export interface NodeType<T> {
    value: T;
    next: NodeType<T> | null | undefined;
}

/**
 * 链表类，用于管理链表中的节点。
 * @template T 链表中存储的元素类型。
 */
export class LinkedListNode<T> {
    head: NodeType<T> | null | undefined;
    count: number;
    equalsFn: (a: T, b: T) => boolean;

    /**
     * 构造函数，初始化链表。
     * @param equalsFn 用于比较两个元素是否相等的函数，默认使用 `defaultEquals`。
     */
    constructor(equalsFn: (a: T, b: T) => boolean = defaultEquals) {
        this.count = 0;
        this.head = null;
        this.equalsFn = equalsFn;
    }

    /**
     * 在链表末尾添加一个新元素。
     * @param element 要添加的元素。
     */
    push(element: T): void {
        const node: NodeType<T> = new Node(element);
        if (this.head == null) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }

    /**
     * 获取指定索引处的节点。
     * @param index 节点的索引。
     * @returns 指定索引处的节点，如果索引无效则返回 `undefined`。
     */
    getElementAt(index: number): NodeType<T> | undefined {
        if (index < 0 || index > this.count - 1) {
            return undefined;
        }

        let current: NodeType<T> | undefined = this.head as NodeType<T> | undefined;
        for (let i = 0; i < index; i++) {
            current = current?.next as NodeType<T>;
        }
        return current;
    }

    /**
     * 移除指定索引处的节点。
     * @param index 节点的索引。
     * @returns 被移除的节点的值，如果索引无效则返回 `undefined`。
     */
    removeAt(index: number): T | undefined {
        if (index < 0 || index > this.count) {
            return undefined;
        }

        if (index == 0) {
            const current = this.head;
            this.head = current?.next;
            this.count--;
            return current?.value;
        }

        let previous: NodeType<T> | null | undefined = null;
        let current: NodeType<T> | null | undefined;

        previous = this.getElementAt(index - 1) as NodeType<T> | null | undefined;
        current = previous?.next as NodeType<T> | null | undefined;

        if (current == null) {
            return undefined;
        }

        if (previous) {
            previous.next = current?.next;
        }

        this.count--;
        return current?.value;
    }

    /**
     * 获取链表的长度。
     * @returns 链表的长度。
     */
    size(): number {
        return this.count;
    }

    /**
     * 移除链表中第一个与给定元素相等的节点。
     * @param element 要移除的元素。
     * @returns 被移除的节点的值，如果未找到则返回 `undefined`。
     */
    remove(element: T): T | undefined {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    /**
     * 在指定索引处插入一个新元素。
     * @param element 要插入的元素。
     * @param index 插入的位置。
     * @returns 插入成功返回 `true`，否则返回 `false`。
     */
    insert(element: T, index: number): boolean {
        if (index < 0 || index > this.count) {
            return false;
        }

        if (index == 0) {
            const node = new Node(element);
            node.next = this.head;
            this.head = node;
            this.count++;
            return true;
        }

        const node = new Node(element);

        const previous = this.getElementAt(index - 1);
        if (previous == null) {
            return false;
        }
        node.next = previous?.next;
        previous.next = node;
        this.count++;
        return true;
    }

    /**
     * 返回链表中所有元素的数组表示。
     * @returns 包含链表中所有元素的数组。
     */
    print(): Array<T> {
        let list: Array<T> = [];
        let current = this.head;
        for (let i = 0; i < this.count; i++) {
            list.push(current?.value as T);
            current = current?.next;
        }
        return list;
    }

    /**
     * 查找链表中第一个与给定元素相等的节点的索引。
     * @param element 要查找的元素。
     * @returns 元素的索引，如果未找到则返回 `-1`。
     */
    indexOf(element: T): number {
        let current = this.head;
        for (let i = 0; i < this.count; i++) {
            if (this.equalsFn(element, current?.value as T)) {
                return i;
            }
            current = current?.next;
        }
        return -1;
    }

    /**
     * 判断链表是否为空。
     * @returns 链表为空返回 `true`，否则返回 `false`。
     */
    isEmpty(): boolean {
        return this.size() === 0;
    }

    /**
     * 获取链表的头节点。
     * @returns 链表的头节点，如果链表为空则返回 `null` 或 `undefined`。
     */
    getHead(): NodeType<T> | null | undefined {
        return this.head;
    }


    /**
     * 清空数据结构中的所有元素
     * 此方法重置数据结构的头部指针和元素计数器，以恢复其初始状态
     */
    clear(): void {
        this.head = null;
        this.count = 0;
    }
}