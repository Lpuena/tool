import * as Mathjs from 'mathjs'

/**
 * 提供一系列数学运算函数的Hook
 */
export function useMath(): {
  /** 减法 */
  sub: (a: number, b: number) => number
  /** 加法 */
  add: (a: number, b: number) => number
  /** 乘法 */
  mul: (a: number, b: number) => number
  /** 除法 */
  div: (a: number, b: number) => number
  /** 开方 */
  sqrt: (a: number) => number | Mathjs.Complex
  /** 绝对值 */
  abs: (a: number) => number
  /** 最大值 */
  max: (a: number, b: number) => number
  /** 最小值 */
  min: (a: number, b: number) => number
} {
  // 减法
  const sub = (a: number, b: number) => Mathjs.subtract(a, b)

  // 加法
  const add = (a: number, b: number) => Mathjs.add(a, b)

  // 乘法
  const mul = (a: number, b: number) => Mathjs.multiply(a, b)

  // 除法
  const div = (a: number, b: number) => Mathjs.divide(a, b)

  // 开方
  const sqrt = (a: number) => Mathjs.sqrt(a)

  // 绝对值
  const abs = (a: number) => Mathjs.abs(a)

  // 最大值
  const max = (a: number, b: number) => Mathjs.max(a, b)

  // 最小值
  const min = (a: number, b: number) => Mathjs.min(a, b)

  return {
    sub,
    add,
    mul,
    div,
    sqrt,
    abs,
    max,
    min,
  }
}
