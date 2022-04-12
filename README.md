
## 组件库

NPM组件库主要将多个项目组件剥离出来，整合成独立库，方便统一维护和迭代。

NPM组件的编写与发布本身不难， 复杂点在于三点;

**2： 配置**
   为了缩减这方面成本， 使用了Dumi作为开发模板， Dumi工具库是基于Father-build， 构建起配置上使用Rollup， 内置tree sharking。

**2： 文档**
      每个组件都有对应的文档、DEMO实例； 使用者可快速上手操作。

**3:  测试**
     提供给多项目使用组件库，出现Bug会牵连大，必要的话编写单元测试

## 命令行

**npm run dev 项目启动 使用 dumi，组件开发和文档开发在一起**

**npm run test 组件测试 -**

**npm run test:coverage 代码覆盖率查看 -**

**npm run fix 代码风格修正 -**

**npm run eslint 检测代码 -**

**npm run c:build 组件打包 使用 father 工具**

**npm run release 组件打包发布 -**

**npm run build 文档打包 -**

**git cz 代码上传(Commitizen) -**

## 组件分类

**Common**：
通用组件类型, 不涉及任何业务代码,不收场景限制.

**Special**：
业务组件类型, 仅适用于公司内部和涉及业务代码

**Hooks**：
hook

**Function**:
公共方法

## 提交

**Commitizen**：

本项目已集成 commitizen，并使用基于 Angular Team 规范的 cz-conventional-changelog adapter。强烈推荐使用 commitizen 规范你的 commit message 格式，并学会把握每一次 commit 的范围，使你的每个 commit 都只专注于一个目标。

在项目根目录下运行 `npm i` 安装依赖后，

本地上安装：
npm install commitizen -g

项目内运行：
commitizen init cz-conventional-changelog --yarn --dev --exact

**commit 类型说明**：

-   build: 影响项目打包流程，或修改了外部依赖项 (example scopes: gulp, broccoli, npm)
-   ci: 修改 ci/cd 配置文件等影响持续构建流程的行为 (example scopes: Travis, Circle, BrowserStack, Gitlab CI，Dockerfile)
-   docs: 项目文档的修改
-   feat: 增加新的功能
-   fix: 修复已知 bug
-   perf: 提升项目性能的修改
-   refactor: 既不是添加新功能，也不是修复 bug 的代码修改，一般是一些实现流程重写
-   style: 源码的代码风格调整，不是指样式文件修改！ (white-space, formatting, missing semi-colons, etc)
-   test: 测试代码相关的修改
