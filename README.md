# 前言

对node有很大兴趣, 学习了一段时间打算做个小项目入门实践, 最终选择做个博客, 因为博客系统算是做demo中简单的。

如果想自己搭一个自己的博客网站, 可以在这个系统基础上扩展。

## 技术栈

前台: Flat UI + jade

后台: node + express + mongodb


## 心得

- 学习node+express的基本架构(R + M + V + C), MVC的基本设计
- middleware 的正确用法
- 如何设计 Mongodb schema
- Mongoose, MongoDB的CRUD操作
- 登陆验证

## 项目运行

```

git clone git@github.com:1657413883/node-blog.git

cd node-blog

npm install

npm start (前提本地先跑起MongoDB,配置见config.js)

```

# 效果演示


![这里写图片描述](http://img.blog.csdn.net/20171124233742729?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlhb3pvbmdnZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

![这里写图片描述](http://img.blog.csdn.net/20171124233754299?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlhb3pvbmdnZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

![这里写图片描述](http://img.blog.csdn.net/20171124233805520?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlhb3pvbmdnZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

![这里写图片描述](http://img.blog.csdn.net/20171124233816078?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlhb3pvbmdnZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

![这里写图片描述](http://img.blog.csdn.net/20171124233827014?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveGlhb3pvbmdnZQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

# 功能

前台

- [x] 所有文章(首页)含翻页, 搜索。
- [x] 文章详情页面, 文章评论
- [x] 文章分类, 分类下所有文章
- [x] 登陆(前后台权限校验)
- [x] 注册

后台(访问地址http://localhost:3000/admin)
登陆(http://localhost:3000/admin/users/login)

- [x] 文章搜索, 删除, 查看, 编辑, 添加
- [x] 分类删除, 查看, 编辑, 添加
- [x] 修改密码(未做)
- [x] 注销


# 待开发功能

- [x] 点赞
- [x] 评论回复
- [x] 代码优化


# License

[MIT]