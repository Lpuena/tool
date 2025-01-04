// @unocss-include
export function useMessage() {
  const notifications: HTMLElement[] = []
  const spacing = 14 // 通知之间的间距

  const calculatePosition = (el: HTMLElement) => {
    // const height = el.offsetHeight
    const topOffset = notifications.reduce((acc, curr) => {
      return acc + curr.offsetHeight + spacing
    }, 16) // 初始 top 为 16px
    el.style.top = `${topOffset}px`
    notifications.push(el)
  }

  const removeNotification = (el: HTMLElement) => {
    const index = notifications.indexOf(el)
    if (index > -1) {
      notifications.splice(index, 1)
      // 更新剩余通知的位置
      notifications.forEach((notification, i) => {
        const topOffset = i === 0
          ? 16
          : notifications.slice(0, i).reduce((acc, curr) => {
              return acc + curr.offsetHeight + spacing
            }, 16)
        notification.style.top = `${topOffset}px`
      })
    }
  }

  // ... 已有代码 ...

const showMessage = (type: 'success' | 'error', message: string): void => {
  const el = document.createElement('div')
  el.className = `fixed right-4 px-6 py-4 rounded-xl shadow-xl z-50 transform transition-all duration-300 backdrop-blur-sm ${
    type === 'success' 
      ? 'bg-green-50/90 border border-green-200 text-green-900' 
      : 'bg-red-50/90 border border-red-200 text-red-900'
  } translate-x-60 opacity-0`

  // 初始位置计算
  calculatePosition(el)

  // 入场动画
  setTimeout(() => {
    el.classList.remove('opacity-0', 'translate-x-60')
  }, 10)

  el.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="shrink-0 w-6 h-6 flex items-center justify-center rounded-full ${
        type === 'success' 
          ? 'bg-green-500/20 text-green-500' 
          : 'bg-red-500/20 text-red-500'
      }">
        ${type === 'success' ? '✓' : '✕'}
      </div>
      <div class="text-sm leading-5">${message}</div>
    </div>
  `
  document.body.appendChild(el)

  // 出场动画
  setTimeout(() => {
    el.classList.add('opacity-0', 'translate-x-60')
    setTimeout(() => {
      removeNotification(el)
      el.remove()
    }, 300)
  }, 3000)
}

// ... 已有代码 ...

  return {
    showMessage,
  }
}
