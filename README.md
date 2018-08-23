# 签到系统
***
## 使用技术:

- 后端: Node.js [express](http://www.expressjs.com.cn/)
- 前端: 移动端 + jQuery + [jQuery-qrcore](https://github.com/jeromeetienne/jquery-qrcode)
- 数据库: MySQL

## 需求

1. 实现扫描二维码进入签到页面

2. 二维码30s过期

3. 同一用户不能签到多次

## 解决方案

1. 使用jQuery插件实现二维码

2. 在nodejs里面使用setInterval切换有效路由, 实现二维码过期效果

3. 通过IP判断是否是同一用户

## 遇到的问题

1. 需要在大屏幕上显示二维码, 并且要保密二维码.html页面, 所以需本地打开, 涉及到跨域问题, 使用jsonp解决

2. 许多用户会使用微信来扫面二维码, 由于直接使用`IP地址`访问网页, 微信浏览器会发出警告, 并且在签到完之后, 会进行`二次跳转`, 在没有域名之前, 判断用户的User-Agent中是否包含 `microchat` 来确定是否是微信浏览器, 如果是, 则提示用户用手机浏览器打开.
