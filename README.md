# 社区邻里综合服务平台

## 项目简介

社区邻里综合服务平台是一个面向城市社区的综合服务管理系统，旨在为社区居民、社区管理者和志愿者提供一站式的数字化服务。平台涵盖邻里活动管理、老年助餐预约、社区闲置物品置换、志愿者排班管理和民情诉求台账等核心功能模块，帮助社区实现信息化、精细化管理。

## 适用场景

- 城市社区居委会日常管理与服务
- 街道办事处下辖社区的综合服务平台
- 老年人集中居住社区的助餐与关爱服务
- 社区志愿者组织的服务调度与管理
- 社区治理与居民诉求响应平台

## 核心功能

### 1. 邻里活动报名
- 发布社区活动（运动会、文艺汇演、知识讲座等）
- 居民在线报名参加活动
- 活动人数限制与自动满员处理
- 报名列表查看与取消报名

### 2. 老年助餐预约
- 每日菜单展示（早/午/晚餐）
- 在线预约订餐
- 订单管理与状态跟踪
- 管理员确认与取消订单

### 3. 社区闲置置换
- 发布闲置物品信息
- 物品分类与成色标注
- 物品详情查看与联系方式
- 标记已置换/下架管理

### 4. 志愿者排班
- 管理员创建志愿排班任务
- 志愿者在线报名参加
- 排班详情与志愿者名单查看
- 取消报名与满员自动处理

### 5. 民情诉求台账
- 居民提交诉求（基础设施、环境卫生、噪音等）
- 诉求优先级与分类管理
- 管理员处理状态更新与回复
- 诉求统计与台账查看

### 6. 平台概览仪表盘
- 各模块数据统计概览
- 最新活动与诉求动态
- 诉求处理状态统计

## 技术栈

| 技术 | 说明 |
|------|------|
| Node.js 20 | 运行时环境 |
| TypeScript | 类型安全的开发语言 |
| Express.js | Web 应用框架 |
| EJS | 模板引擎 |
| SQLite (better-sqlite3) | 嵌入式数据库 |
| bcryptjs | 密码加密 |
| express-session | 会话管理 |

## 目录结构

```
repo/
├── src/
│   ├── config/
│   │   ├── app.ts              # 应用配置
│   │   └── database.ts         # 数据库初始化与连接
│   ├── controllers/
│   │   ├── authController.ts   # 认证控制器
│   │   ├── activityController.ts # 活动控制器
│   │   ├── mealController.ts   # 助餐控制器
│   │   ├── exchangeController.ts # 置换控制器
│   │   ├── volunteerController.ts # 志愿者控制器
│   │   ├── complaintController.ts # 诉求控制器
│   │   └── dashboardController.ts # 仪表盘控制器
│   ├── middleware/
│   │   └── auth.ts             # 认证中间件
│   ├── models/
│   │   ├── user.ts             # 用户模型
│   │   ├── activity.ts         # 活动模型
│   │   ├── mealOrder.ts        # 助餐订单模型
│   │   ├── exchangeItem.ts     # 置换物品模型
│   │   ├── volunteerShift.ts   # 志愿排班模型
│   │   └── complaint.ts        # 诉求模型
│   ├── routes/
│   │   ├── index.ts            # 路由汇总
│   │   ├── auth.ts             # 认证路由
│   │   ├── activities.ts       # 活动路由
│   │   ├── meals.ts            # 助餐路由
│   │   ├── exchanges.ts        # 置换路由
│   │   ├── volunteers.ts       # 志愿者路由
│   │   └── complaints.ts       # 诉求路由
│   ├── services/
│   │   ├── userService.ts      # 用户服务
│   │   ├── activityService.ts  # 活动服务
│   │   ├── mealService.ts      # 助餐服务
│   │   ├── exchangeService.ts  # 置换服务
│   │   ├── volunteerService.ts # 志愿者服务
│   │   └── complaintService.ts # 诉求服务
│   ├── seed.ts                 # 种子数据
│   └── server.ts               # 服务入口
├── views/                      # EJS 模板
│   ├── layout.ejs
│   ├── index.ejs
│   ├── partials/
│   ├── auth/
│   ├── activities/
│   ├── meals/
│   ├── exchanges/
│   ├── volunteers/
│   ├── complaints/
│   └── dashboard/
├── public/
│   ├── css/style.css
│   └── js/main.js
├── package.json
├── tsconfig.json
└── .gitignore
```

## Docker 启动方式

```bash
# 构建镜像
docker build -t community-service .

# 运行容器
docker run -d -p 3000:3000 -e SSH_ENABLE=true community-service

# 访问服务
# 浏览器打开 http://localhost:3000
```

## 本地启动方式

```bash
# 进入项目目录
cd repo

# 安装依赖
npm install

# 初始化种子数据
npx ts-node src/seed.ts

# 启动服务
npx ts-node src/server.ts

# 访问服务
# 浏览器打开 http://localhost:3000
```

## 默认账号

| 角色 | 用户名 | 密码 | 说明 |
|------|--------|------|------|
| 管理员 | admin | admin123 | 拥有所有功能权限 |
| 普通居民 | zhangwei | 123456 | 张伟 |
| 普通居民 | lina | 123456 | 李娜 |
| 普通居民 | wangfang | 123456 | 王芳 |
| 普通居民 | zhaoming | 123456 | 赵明 |
| 普通居民 | liuyang | 123456 | 刘洋 |
| 普通居民 | chenxia | 123456 | 陈霞 |
| 普通居民 | sunqiang | 123456 | 孙强 |
| 普通居民 | zhouli | 123456 | 周丽 |

## 可扩展方向

1. **消息通知系统**：集成短信/微信推送，活动提醒、诉求处理通知等
2. **数据可视化**：引入 ECharts 等图表库，增强仪表盘数据展示
3. **移动端适配**：优化响应式布局或开发微信小程序端
4. **权限管理增强**：细化角色权限（网格员、楼栋长等角色）
5. **文件上传**：支持闲置物品图片上传、诉求附件上传
6. **数据导出**：支持诉求台账、助餐订单等数据导出为 Excel
7. **API 接口**：提供 RESTful API，支持第三方系统集成
8. **数据库升级**：从 SQLite 迁移至 MySQL/PostgreSQL，支持更大规模部署
9. **缓存优化**：引入 Redis 缓存热点数据，提升访问性能
10. **日志审计**：添加操作日志记录，满足社区治理审计需求
