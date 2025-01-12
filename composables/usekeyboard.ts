export function useKeyboards() {
  // 定义键位类型
  type KeyboardKey = string | { key: string, width: number }

  // 定义键盘布局类型
  type KeyboardLayout = KeyboardKey[][]

  // 定义特殊键宽度
  const KEY_WIDTHS = {
    SHIFT: 150,
    CAPSLOCK: 120,
    SPACE: 400,
    BACKSPACE: 120,
    ENTER: 120,
    DELETE: 120,
    RETURN: 120,
  }

  // 导出键盘布局
  const winKeyboardLayout: KeyboardLayout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', { key: 'Backspace', width: KEY_WIDTHS.BACKSPACE }],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    [{ key: 'CapsLock', width: KEY_WIDTHS.CAPSLOCK }, 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', { key: 'Enter', width: KEY_WIDTHS.ENTER }],
    [{ key: 'Shift', width: KEY_WIDTHS.SHIFT }, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', { key: 'Shift', width: KEY_WIDTHS.SHIFT }],
    ['Ctrl', 'Win', 'Alt', { key: 'Space', width: KEY_WIDTHS.SPACE }, 'Alt', 'Win', 'Ctrl'],
  ]

  const macKeyboardLayout: KeyboardLayout = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', { key: 'Delete', width: KEY_WIDTHS.DELETE }],
    ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    [{ key: 'CapsLock', width: KEY_WIDTHS.CAPSLOCK }, 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', { key: 'Return', width: KEY_WIDTHS.RETURN }],
    [{ key: 'Shift', width: KEY_WIDTHS.SHIFT }, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', { key: 'Shift', width: KEY_WIDTHS.SHIFT }],
    ['Fn', 'Control', 'Option', 'Command', { key: 'Space', width: KEY_WIDTHS.SPACE }, 'Command', 'Option'],
  ]
  return {
    winKeyboardLayout,
    macKeyboardLayout,
  }
}
