// @unocss-include
export const useMessage = () => {
  const notifications: HTMLElement[] = []
  const spacing = 14 // 通知之间的间距

  const calculatePosition = (el: HTMLElement) => {
    const height = el.offsetHeight
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

  const showMessage = (type: 'success' | 'error', message: string): void => {
    const el = document.createElement('div')
    el.className = `fixed right-4 px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all duration-300 ${
      type === 'success' ? 'bg-green-400' : 'bg-red-500'
    } text-white translate-x-60 opacity-0`
    
    // 初始位置计算
    calculatePosition(el)
    
    // 入场动画
    setTimeout(() => {
      el.classList.remove('opacity-0', 'translate-x-60')
    }, 10)

    el.textContent = message
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

  return {
    showMessage
  }
}
