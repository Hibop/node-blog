
/**
 * desc: 全局配置文件
 */

const path = require('path');
const config = {
  // debug 为 true 时，用于本地调试
  debug: true,
  // 是否启用静态文件的合并压缩，详见视图中的Loader
  // get mini_assets() { return !this.debug; }, 
  name: 'NodeBlog',
  description: '仿Cnode社区的博客系统',
  keywords: 'node, express, blog',
  // 添加到 html head 中的信息
  site_headers: [
    '<meta name="author" content="EDP@TAOBAO" />'
  ],
  // default is `name`
  site_logo: '/public/images/cnodejs_light.svg',
  // 默认没有 favicon, 这里填写网址
  site_icon: '/public/images/cnode_icon_32.png',
  // 右上角的导航区
  site_navs: [
    // 格式 [ path, title, [target=''] ]
    [ '/about', '关于' ]
  ],
  // cdn host，如 http://cnodejs.qiniudn.com
  site_static_host: '', // 静态文件存储域名
  // 域名
  host: 'localhost',
  // mongodb 配置
  db: 'mongodb://127.0.0.1/nodeBlog',
  // redis 配置，默认是本地
  redis_host: '127.0.0.1',
  redis_port: 6379,
  redis_db: 0,
  redis_password: '',
  // session秘钥
  session_secret: 'node_blog',
  auth_cookie_name: 'node_club',
  // 程序运行的端口
  port: 3000,
  // 话题列表显示的话题数量
  list_topic_count: 20,
  // 日志目录
  log_dir: path.join(__dirname, 'logs'),
  // 邮箱配置
  mail_opts: {
    host: 'smtp.126.com',
    port: 25,
    auth: {
      user: 'club@126.com',
      pass: 'club'
    },
    ignoreTLS: true,
  },
  //weibo app key
  weibo_key: 10000000,
  weibo_id: 'your_weibo_id',
  // admin 可删除话题，编辑标签。把 user_login_name 换成你的登录名
  admins: { user_login_name: true },
  // github 登陆的配置
  GITHUB_OAUTH: {
    clientID: 'your GITHUB_CLIENT_ID',
    clientSecret: 'your GITHUB_CLIENT_SECRET',
    callbackURL: 'http://cnodejs.org/auth/github/callback'
  },
  // 是否允许直接注册（否则只能走 github 的方式）
  allow_sign_up: true,
  // oneapm 是个用来监控网站性能的服务
  oneapm_key: '',
  // 下面两个配置都是文件上传的配置
  // 7牛的access信息，用于文件上传
  qn_access: {
    accessKey: 'your access key',
    secretKey: 'your secret key',
    bucket: 'your bucket name',
    origin: 'http://your qiniu domain',
    // 如果vps在国外，请使用 http://up.qiniug.com/ ，这是七牛的国际节点
    // 如果在国内，此项请留空
    uploadURL: 'http://xxxxxxxx',
  },
  // 文件上传配置
  // 注：如果填写 qn_access，则会上传到 7牛，以下配置无效
  upload: {
    path: path.join(__dirname, 'public/upload/'),
    url: '/public/upload/'
  },
  file_limit: '1MB',
  // 版块
  tabs: [
    ['share', '分享'],
    ['ask', '问答'],
    ['job', '招聘'],
  ],
  // 极光推送
  jpush: {
    appKey: 'YourAccessKeyyyyyyyyyyyy',
    masterSecret: 'YourSecretKeyyyyyyyyyyyyy',
    isDebug: false,
  },
  create_post_per_day: 1000, // 每个用户一天可以发的主题数
  create_reply_per_day: 1000, // 每个用户一天可以发的评论数
  create_user_per_ip: 1000,
  visit_per_day: 1000, // 每个 ip 每天能访问的次数
};
if (process.env.NODE_ENV === 'test') {
  config.db = 'mongodb://127.0.0.1/nodeBlog_test';
}
module.exports = config;