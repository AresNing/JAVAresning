# 基本介绍

- Tomcat：由Apache基金组织开发的开源web服务器软件，中小型的JavaEE服务器，仅仅支持少量的 JavaEE 规范
- JavaEE：Java 语言在企业级开发中使用的技术规范的总和，一共规定了13项大的规范

# 启动与关闭

### 启动

- `bin/startup.bat`，双击运行
- 访问本地：浏览器输入`http://localhost:8080` 
- 访问外地：浏览器输入` http://外地ip:8080` 

## 关闭

- `bin/shutdown.bat`
- 快捷键`ctrl+c`
- 强制关闭

# 动态项目目录结构

- 项目的根目录

  - src目录
  - out目录
    - classes 目录：放置字节码文件的目录
  - web目录
    - WEB-INF目录（WEB-INF目录下的资源不能被浏览器直接访问）
      - `web.xml`：web项目的核心配置文件

  - lib 目录：放置依赖的 jar 包

# 部署

## 直接部署

直接将项目放到 webapps 目录下

- 项目的访问路径 --> 虚拟目录
- 简化部署：将项目打成一个 war 包，再将 war 包放置到 webapps 目录下（ war 包会自动解压缩）

## 配置部署

配置`conf/server.xml`文件

- 在`<Host>`标签体中配置，添加以下语句：

  ```xml
  <Context docBase="..." path="..." />
  ```

  - `docBase`：项目存放的路径
  - `path`：虚拟目录

## 热部署

在`conf\Catalina\localhost`创建任意名称的 XML 文件

- 在 XML 文件中编写

  ```xml
  <Context docBase="..." />
  ```

  - `docBase`：项目存放的路径
  - 虚拟目录：XML 文件的名称

* 热部署
  - 若想取消部署，可将 XML 文件类型改为其他文件类型（如`.xml`-->`.xml_BAK`），而不用删除 XML 文件；若想重新部署，则将文件类型改为`.xml`

## IDEA部署

- [IDEA 2020.2 创建 JavaWeb 项目（部署Tomcat）方法](https://blog.csdn.net/qq_43441078/article/details/107912291)











