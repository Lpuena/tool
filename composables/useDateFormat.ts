import dayjs from 'dayjs'

/**
 * 格式化日期的函数，如果不传入日期则使用当前时间，默认格式为 'YYYY-MM-DD'。
 */
export function useDateFormat(
  dateString: string | Date | number = '',
  format = 'YYYY-MM-DD',
): string {
  const date = dateString ? dayjs(dateString) : dayjs() // 如果没有传入日期，使用当前时间
  return date.format(format) // 返回格式化后的日期
}
