# A Node.js Introduction
-------------------------------

1. **What**'s Nodejs ?
2. **Why** Javascript ?
3. What **can** Nodejs do ?
<br>
<br>

## 1. Node.js Intro
----------------------------------------
   1. 创始人**Ryan Dahl**  
    ![node_chrome](assets/images/Ryan Dahl.jpg) 

   2. Node.js第一个版本发布于2009年
   
   在创造出 Node.js 之前，他是一名资深的 C/C++ 工程师，主要工作都是围绕高性能 Web 服务器进行的。   
   在经过自己的不断摸索之后，他提出了高性能服务器的几个要点：**事件驱动，非阻塞 I/O** 。 
   
    _Ryan Dahl 现在已经不参与 Node.js 的开发维护了，他在把 Node.js 的整体架构基本构建完成之后就消失了。。。_

   2. **选择 JavaScript**
   
   在写 Node.js 的时候，Ryan Dahl 曾经评估过 C、Lua、Haskell、Ruby 等语言作为备选实现。
    
   最后都弃用了，包括如下原因：
   
    * C 的开发门槛高
    * Lua 自身已经有很多阻塞 I/O 库，历史包袱比较重
    * Haskell 落选是因为 Ryan Dahl 觉得自己还玩不转它。。。
    * Ruby 的虚拟机性能不给力，所以也落选了
    
   **而 JavaScript:** 
         
    * 虽然坑多，但是初学起来还是比较容易,
    * 之前在服务端毫无表现，所以没有历史包袱
    * JS 之前在前端开发中，基于事件驱动有广泛的应用
    
        ```javascript
            $('button').on('click', function () {
                // ...
            });
        ```

<br>
<br>

## 2. JavaScript Basic
-------------------------------

1. 变量
    ```javascript
    var aNum = 1,
        aStr = "hello world",
        dt = new Date();
        
    var array = [aNum, aStr, dt];  //duck type
    
    ```
    
2. 函数
    ```javascript
    function greet() {
        console.log('hello world');
    }
    
    var greet = function() {
        console.log('hello world');
    }
    
    var greet2 = function(name) {
        console.log('hello ' + name);
    }    
    
    array.forEach(function(item) {
        console.log(item);
    });
    ```

2. 对象
    ```javascript
    person = new Object();
    person.firstName = "Bill";
    person.lastName = "Gates";
    person.age = 56;
    
    //or      
    person = {firstName: "Bill", lastName: "Gates", age: 18}
    ```
4. 回调
    ```javascript
    //对于一个简单的数据库访问操作，传统方式是这样实现的
    res = db.query('SELECT * from some_table');
    res.output();

    //异步的处理方式
    db.query('SELECT * from some_table', function(res) { 
       res.output();
    });
    ```

4. _JavaScript 类_
    
    > JavaScript是面向对象的语言，但JavaScript不使用类。
    
    > 在JavaScript中，不会创建类，也不会通过类来创建对象。
    
    > JavaScript 基于 prototype，而不是基于类的。 

5. JavaScript 由两部分组成
    1. core JavaScript
    2. client JavaScript（DOM、BOM）
       
    > 只有core JavaScript可以在node.js上运行.
    
    > node.js借用了JavaScript的语法，但并不能用来处理浏览器对象（BOM）及文档对象（DOM）
    
    > 所以node.js并不是设计为在服务器端运行解析html文档的，所以```在服务器端运行的JavaScript```在一定程度上误导了初学者。
    
    > node.js并不仅仅运行core JavaScript，node.js中还有文件系统、模块包、操作系统API、网络通信、二进制类型处理等core JavaScript不具备的功能。   
      ![node_modules1](assets/images/node_modules1.png)
      
    3. 对比
      
      ![node_chrome](assets/images/chrome_vs_node.png)  



<br>
<br>

## 3. 结构
   
<img class="node-struct" src="assets/images/struct2.jpg">
  
1. Node.js 用异步式 I/O 和事件驱动代替多线程，带来了可观的性能提升

2. 使用 V8 作为JavaScript引擎，libev 和 libeio 库支持事件驱动和异步式 I/O。

3. Node.js 的开发者在 libev 和 libeio 的基础上还抽象出了层 libuv。
对于 POSIX操作系统，libuv 通过封装 libev 和 libeio 来利用 epoll 或 kqueue。

4. 在 Windows 下，libuv 使用了 Windows 的 IOCP（Input/Output Completion Port，输入输出完成端口）机制，
以在不同平台下实现同样的高性能。

<img class="node-struct2" src="assets/images/struct.png">

<br>
<br>

5. 事件循环和异步IO
![multiThreadServer](assets/images/multiThreadedServer.png)

![EventedIO](assets/images/NodeJS-EventedIOAsyncIO_latest.png)

<br>
<br>

异步 I/O
```
// fs 是 Node.js 中的文件管理系统
var fs = require('fs');

fs.readFile('/tmp/helloworld', function (err, file) {
    console.log('读取完成');
});
console.log('发起读取');

//var afterRead = funcion(err, file) {console.log('读取完成');}
//fs.readFile('/tmp/helloworld', afterRead);
//console.log('发起读取');

```

![EventedIO](assets/images/asyncio.png)

<br>
<br>
<br>
<br>
```
var fs = require('fs');

fs.readFile('/tmp/helloworld', function (err, file) {
    console.log('1读取完成');
});
console.log('发起读取');

fs.readFile('/tmp/helloworld2', function (err, file) {
    console.log('2读取完成');
});

```

![async_io](assets/images/async_io.png)

<br>
<br>
<br>

## 4. 简单例子
---------------------------------------

### 1. [FileSystem](http://nodejs.org/api/fs.html "Title")
### 2. [net](http://nodejs.org/api/net.html "Title")
### 3. [HTTP](http://nodejs.org/api/http.html "Title")
### 4. [Express](https://github.com/strongloop/express "Title")


<br>
<br>
<br>
![when](assets/images/when.png)





