/**
 * 表示单向链表的基本节点类。
 */
export class Node {
    value: any;
    next: any | undefined;

    /**
     * Node 类构造函数。
     * @param element 要存储在节点中的值。
     */
    constructor(element: any) {
        this.value = element;
        this.next = undefined;
    }
}

/**
 * 表示双向链表的节点类，继承自 Node 类。
 */
export class DoublyNode extends Node {
    previous: any | undefined;

    /**
     * DoublyNode 类构造函数。
     * @param element 要存储在节点中的值。
     * @param next 指向下一个节点的引用（可选）。
     * @param previous 指向前一个节点的引用（可选）。
     */
    constructor(element: any, next?: any, previous?: any) {
        super(element);
        this.next = next;
        this.previous = previous;
    }
}