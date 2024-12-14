/**
 * 判断两个值是否相等的默认比较函数
 * 
 * 此函数用于比较两个值是否相等，它不仅仅比较它们的值是否相同，
 * 还比较它们的类型是否相同。这意味着只有当两个值的类型和值都相同时，
 * 这个函数才会返回true。这对于在需要比较两个值是否完全相同时的场景非常有用。
 * 
 * @param a 第一个待比较的值
 * @param b 第二个待比较的值
 * @returns 如果两个值的类型和值都相同，则返回true；否则返回false
 */
export function defaultEquals(a: any, b: any):boolean{
    return a === b;
}