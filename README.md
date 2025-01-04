# 工具网站

这是一个基于Nuxt 3构建的工具类网站，提供多种实用工具。

## 功能列表

- JSON转TypeScript
- 键盘按键检测
- 鼠标点击检测

## 项目结构

```
├── components/        # 可复用组件
├── composables/       # 组合式API
├── layouts/           # 布局组件
├── pages/             # 页面组件
├── public/            # 静态资源
└── server/            # 服务端相关
```

## 开发环境

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 生产环境构建

```bash
pnpm build
```

### 预览生产环境

```bash
pnpm preview
```

## 贡献指南

欢迎提交PR或issue来改进项目。

1. Fork项目
2. 创建新分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request
