# Docker



前置知识：某一种编程语言、linux命令

容器技术的诞生解决了it世界里 集装箱运输的问题，lxc linux container 是一种内核轻量级的操作系统层虚拟化技术。Linux Container主要由Namespace 和Cgroup两大机制保证实现。Docker是容器技术的最佳代表。



## Docker 低层工作原理

client-server结构的系统，Docker的守护进程运行在主机上。通过Socket从客户端访问。DockerServer接收到Docker-Client的指令，就会执行这个命令！



### Dcoker为什么比VM快？

1、比虚拟机更少的抽象层

2、docker利用的是宿主机的内核，vm需要的是Guest OS



### Docker的常用命令

#### 帮助命令 

官网：Docs-Reference

```shell
docker version # 版本信息
docker info # 显示docker 
docker 命令 --help
```

#### 镜像命令

##### docker images

```shell
docker images # 所有本地镜像
# 解释
REPOSITORY 镜像的仓库源
TAG 镜像的标签
IMAGE ID 镜像id

# 可选项
-a 列出所有
-f 过滤
-q --quiet 只显示镜像id

```

##### docker search 搜索镜像

```shell
docker search mysql

# 可选项
--filter=STARS=3000 # 搜索出来的镜像都是starts大于3000的
```



#### docker pull

```shell
docker pull 镜像名[:tag] # tag默认latest

# 分层下载
# 签名
# 真实地址
```

##### docker rmi 删除镜像

可通过image id 和名称 删除



#### 容器命令

有了镜像才可以创建容器



新建容器并启动

```shell
docker run [可选参数] image

# 参数说明
--name="Name" 容器名字 
-d 后台方式运行
-it 使用交互方式运行，进入容器查看内容
-p 指定容器端口 -p 8080:8080
   -p ip:主机端口：容器端口
   -p 主机端口：容器端口
   -p 容器端口
-P 随机指定端口

# exit 从容器退出
```

#### 列出所有运行的容器

```shell
docker ps 命令

-a # 列出当前正在运行的容器+带出历史运行过的容器
-n=？ # 显示最近创建的容器
-q # 只显示容器的编号

```

#### 退出容器

```shell
exit # 容器停止并退出

Ctrl + P + Q # 容器不停止退出
```

#### 删除容器

```shell
docker rm 容器id # 删除指定的容器，不能删除正在运行的容器，只加-f强制删除
docker rm -f $(docker ps -aq) # 删除所有容器
docker ps -a -q|xargs docker rm # 删除所有的容器
```

#### 启动和停止容器的操作

```shell
docker start 容器id     # 启动容器
docker restart 容器id   # 重启容器
docker stop 容器id      # 停止正在运行的容器
docker kill 容器id      # 强制停止容器
```

### 常用其他命令

##### 后台启动容器

```shell
# 命令 docker run -d 镜像名


```

##### 查看日志命令

```shell
docker logs -tf --tail 容器

--tail number # 要显示的日志条数
```

##### 查看容器的进程信息

```
docker top 容器id
```

##### 查看镜像的元数据

```shell
docker inspect 容器id

```

##### 进入当前容器的命令

```shell
1、docker exec -it 容器id bashShell
进入容器后开启一个新的终端，可在里面操作（常用）

2、docker attach 容器id
进入容器正在执行的终端，不会启动新的进程
```

##### 从容器拷贝文件到主机上

```shell
docker cp 容器id:容器内路径 目的主机路径
```

 

### Docker镜像讲解

#### 镜像是什么

镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件。包含运行某个软件所需的所有内容，包括代码、库、环境变量和配置文件。



#### 镜像加载原理

联合文件系统

#### 分层理解

Docker镜像都是只读的，当容器启动时，一个新的可写层被加载到镜像的顶部！被称为容器层，容器之下为镜像层。



#### commit镜像

```shell
docker commit 提交容器成为一个新的副本

docker commit -m "描述信息" -a="作者" 容器id 目标镜像名:[TAG]
```



### 容器数据卷

数据如果都放到容器，很不安全，删掉容器就没有了，希望数据能持久化。

希望容器之间有一个数据共享的技术！Docker容器中产生的数据，可以同步到本地！

这就是卷技术，目录的挂载，将我们容器内的目录，挂载到linux上面。



**容器的持久化和同步操作** 怎么做呢

#### 使用数据卷



##### 方式一：直接使用命令

```shell
// 
docker run -it -v 主机目录:容器目录

# 然后可以通过docker inspect 查看容器信息里的mounts信息 看到挂载信息
```

###### 实战：安装Mysql



```shell

 docker run -d -p 3310:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7
 
# 在本地连接容器mysql，然后新建一个数据库test，可以发现主机的对应文件夹下有对应的test数据库
[root@iZ8vb6unf4zj3xa0nt66j2Z home]# ls
html  mysql
[root@iZ8vb6unf4zj3xa0nt66j2Z home]# cd mysql
[root@iZ8vb6unf4zj3xa0nt66j2Z mysql]# ls
conf  data
[root@iZ8vb6unf4zj3xa0nt66j2Z mysql]# cd data
[root@iZ8vb6unf4zj3xa0nt66j2Z data]# ls
auto.cnf    client-cert.pem  ibdata1      ibtmp1              private_key.pem  server-key.pem
ca-key.pem  client-key.pem   ib_logfile0  mysql               public_key.pem   sys
ca.pem      ib_buffer_pool   ib_logfile1  performance_schema  server-cert.pem
[root@iZ8vb6unf4zj3xa0nt66j2Z data]# ls
auto.cnf    client-cert.pem  ibdata1      ibtmp1              private_key.pem  server-key.pem
ca-key.pem  client-key.pem   ib_logfile0  mysql               public_key.pem   sys
ca.pem      ib_buffer_pool   ib_logfile1  performance_schema  server-cert.pem  test
[root@iZ8vb6unf4zj3xa0nt66j2Z data]# ls
auto.cnf    client-cert.pem  ibdata1      ibtmp1              private_key.pem  server-key.pem
ca-key.pem  client-key.pem   ib_logfile0  mysql               public_key.pem   sys
ca.pem      ib_buffer_pool   ib_logfile1  performance_schema  server-cert.pem  test
```



###### 具名挂载和匿名挂载



```shell
# 匿名挂载
-v 容器内路径！
docker run -d -P --name nginx01 -v /etc/nginx nginx

# docker volumn ls 查看所有卷的情况 

[root@iZ8vb6unf4zj3xa0nt66j2Z home]# docker volume ls
DRIVER    VOLUME NAME
local     136fe0b7e71c9810b28db662b6f82cf3060335965d2068ce7fec14a5dc973c44

# 上面列表的都是匿名的，我们在-v 只写了容器内的路径，没有写容器外的路径

# 具名挂载 -v 卷名:容器内路径
# docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx nginx
[root@iZ8vb6unf4zj3xa0nt66j2Z home]# docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx nginx
c07dd95cae6b342dfc4603564f72226f42e7f420b1e6f2643236a62f4a7c295b
[root@iZ8vb6unf4zj3xa0nt66j2Z home]# docker volume ls
DRIVER    VOLUME NAME
local     136fe0b7e71c9810b28db662b6f82cf3060335965d2068ce7fec14a5dc973c44
local     juming-nginx

## 查看卷信息
[root@iZ8vb6unf4zj3xa0nt66j2Z home]# docker volume inspect juming-nginx
[
    {
        "CreatedAt": "2021-08-22T16:59:08+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/juming-nginx/_data",
        "Name": "juming-nginx",
        "Options": null,
        "Scope": "local"
    }
]

## 所有docker的卷如果没有指定路径的话，都在 /var/lib/docker/volumes/xxx/_data 下
```

所有docker的卷如果没有指定路径的话，都在**/var/lib/docker/volumes/xxx/_data**下

我们可以通过具名挂载可以方便的找到我们的一个卷，大多数情况在使用**具名挂载**

```shell
-v 容器内路径 #匿名挂载
-v 卷名:容器内路径 #具名挂载
-v /宿主机路径:容器内路径 #指定路径挂载
```



```shell
# 通过-v 容器内路径:ro/rw 改变读写权限
ro 只读
rw 可读可写

docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx:ro nginx
docker run -d -P --name nginx02 -v juming-nginx:/etc/nginx:rw nginx

# ro 这个路径只能通过宿主机操作，容器内部无法操作

```



##### 方式二：Dockerfile

Dockerfile文件就是用来构建镜像的文件。

一个命令就是一层

```shell
# 创建一个dockerfile文件
FROM centos
VOLUME ["volume01","volume02"]
CMD echo "----end-----"
CMD /bin/bash

# 每个命令就是镜像的一层
```



```shell
[root@iZ8vb6unf4zj3xa0nt66j2Z docker-test-volume]# docker build -f /home/docker-test-volume/dockerfile -t yezidiandian/centos:1.0 .
Sending build context to Docker daemon  2.048kB
Step 1/4 : FROM centos
latest: Pulling from library/centos
7a0437f04f83: Pull complete 
Digest: sha256:5528e8b1b1719d34604c87e11dcd1c0a20bedf46e83b5632cdeac91b8c04efc1
Status: Downloaded newer image for centos:latest
 ---> 300e315adb2f
Step 2/4 : VOLUME ["volume01","volume02"]
 ---> Running in 3a2dd5beeb68
Removing intermediate container 3a2dd5beeb68
 ---> 30d70fc04a32
Step 3/4 : CMD echo "----end-----"
 ---> Running in 8a869f17b973
Removing intermediate container 8a869f17b973
 ---> a3189e7fc2a1
Step 4/4 : CMD /bin/bash
 ---> Running in 782c0b1af6a1
Removing intermediate container 782c0b1af6a1
 ---> f57a31cde981
Successfully built f57a31cde981
Successfully tagged yezidiandian/centos:1.0
[root@iZ8vb6unf4zj3xa0nt66j2Z docker-test-volume]# docker images
REPOSITORY            TAG       IMAGE ID       CREATED         SIZE
yezidiandian/centos   1.0       f57a31cde981   5 seconds ago   209MB
nginx                 latest    dd34e67e3371   4 days ago      133MB
mysql                 5.7       6c20ffa54f86   4 days ago      448MB
hello-world           latest    d1165f221234   5 months ago    13.3kB
centos                latest    300e315adb2f   8 months ago    209MB
[root@iZ8vb6unf4zj3xa0nt66j2Z docker-test-volume]# 
```

```shell
# 启动自己的镜像容器，找到了自己挂载的数据卷
# 在里面 touch container.txt 
```

![image-20210822172733633](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822172733633.png)

这个卷和外部一定有一个同步的目录



查看一下挂载的卷的路径：

[root@iZ8vb6unf4zj3xa0nt66j2Z ~]# docker inspect 08a40c35dbab

![image-20210822173132516](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822173132516.png)

在宿主机里对应的目录里找到了对应的**container.txt**文件

![image-20210822173339878](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822173339878.png)



#### 数据卷容器

多个mysql同步数据！！

```shell
# 先启动3个容器
docker run -it --name docker01 yezidiandian/centos:1.0

docker run -it --name docker02 --volumes-from docker01 yezidiandian/centos:1.0
```

![image-20210822190204670](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822190204670.png)



![image-20210822190719913](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822190719913.png)



在docker01的volume01中新建一个docker01文件

![image-20210822190955446](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822190955446.png)

在docker02中能看到了

![image-20210822191052245](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822191052245.png)



docker01容器就是数据卷容器



![image-20210822191333133](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822191333133.png)



在docker03中新建一个docker03文件，在docker01和docker02中都能看到

![image-20210822191422590](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822191422590.png)



![image-20210822191706995](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822191706995.png)



删除docker01容器后，在docker02和docker01中还能看到文件。

**总结：--volumes-from 就想当于是拷贝？？**



多个mysql实现数据共享

```shell
docker run -d -p 3310:3306 -v /etc/mysql/conf.d -v /var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7

docker run -d -p 3310:3306 -e MYSQL_ROOT_PASSWORD=123456 --name mysql02 --volumes-from mysql01  mysql:5.7

# 实现两个容器数据同步
```



结论：

容器之间配置信息的传递，数据卷容器的声明周期一直持续到没有容器使用位置。一旦持久化到本地，这个时候，容器被删除，本地的数据也不会被删除！



经测试，删除文件也会同步



### Dockerfile

dockerfile用来构建镜像文件，命令参数脚本！



构建步骤：

1. 编写一个dockerfile文件
2. docker build构建成为一个镜像
3. docker run 运行镜像
4. docker push发布镜像（docker hub，阿里云镜像仓库）



#### Dockerfile 构建过程

**基础知识：**

1. 每个保留字都是大写的

2. 执行从上到下，#表示注释

3. 每个指令都会创建提交一个新的镜像层，并提交！

   

![image-20210822194850743](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822194850743.png)



##### Dockerfile的指令



```shell
FROM # 基础镜像
MAINTAINER #镜像谁写的 姓名+邮箱
RUN # 镜像构建的时候需要运行的命令
ADD #步骤：添加内容
WORKDIR #镜像的工作目录
VOLUME # 挂载的目录
EXPOSE # 暴露端口配置
CMD # 指定容器启动的时候需要运行的命令，只有最后一个会生效，可被替代
ENTRYPOINT # 指定容器启动的时候要运行的命令，可以追加命令
ONBUILD # 当构建一个被继承dockerfile 这个时候会运行这个指令
COPY # 类似ADD  将文件拷贝到镜像中
ENV  # 构建的时候 设置环境变量
```



![image-20210822195238148](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822195238148.png)



##### 实战测试

运行基本的centos镜像，进入到容器中发现不能使用`vim` 、`ifcconfig`命令，并且进入容器后直接到了根目录`/`。所以我们可以构建我们自己的镜像：



>1. 进入容器直接到工作目录 `/usr/local`；
>2. 可以使用`vim`、`ifconfig`命令；



```shell
# 
FROM centos
MAINTAINER yezidiandian<1092923594@qq.com>

ENV MYPATH /usr/local
WORKDIR $MYPATH

RUN yum -y install vim
RUN yum -y install net-tools

EXPOSE 80

CMD echo $MYPATH
CMD echo "----end----"
CMD /bin/bash

```



```shell
# 构建命令
# docker build -f dockerfile文件路径 -t 镜像名:[tag]
docker build -f my-centos-dockerfile -t mycentos:0.1 .

# 测试运行
docker run -it mycentos:0.1
```

![image-20210822204642297](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822204642297.png)



可以列出本地镜像的历史记录

```shell
docker history 镜像id
```



![image-20210822205228434](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822205228434.png)



>  CMD和ENTRYPOINT的区别

```shell
CMD # 指定这个容器启动的时候要运行的命令，只有最后一个会生效，可被替代
ENTRYPOINT # 指定这个容器启动的时候要运行的命令，可以追加命令
```

```

# dockerfile-cmd-test 文件内容

FROM centos
CMD ["ls","-a"]

# 构建镜像之后运行，然后可以看到容器启动之后执行了 ls -a命令
```



![image-20210822210508808](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822210508808.png)

![image-20210822210613924](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822210613924.png)



```
# 想追加一个命-l ls-al
[root@iZ8vb6unf4zj3xa0nt66j2Z dockerfile]# docker run -it centos-cmd:0.1 -l
docker: Error response from daemon: OCI runtime create failed: container_linux.go:380: starting container process caused: exec: "-l": executable file not found in $PATH: unknown.

# cmd的情况下 -l替换了CMD命令，-l不是命令 所以报错了，所以可改为(需要写上完成的命令):
[root@iZ8vb6unf4zj3xa0nt66j2Z dockerfile]# docker run -it centos-cmd:0.1 ls -al
total 0
drwxr-xr-x   1 root root   6 Aug 22 13:10 .
drwxr-xr-x   1 root root   6 Aug 22 13:10 ..
-rwxr-xr-x   1 root root   0 Aug 22 13:10 .dockerenv
lrwxrwxrwx   1 root root   7 Nov  3  2020 bin -> usr/bin
drwxr-xr-x   5 root root 360 Aug 22 13:10 dev
drwxr-xr-x   1 root root  66 Aug 22 13:10 etc
drwxr-xr-x   2 root root   6 Nov  3  2020 home
lrwxrwxrwx   1 root root   7 Nov  3  2020 lib -> usr/lib
lrwxrwxrwx   1 root root   9 Nov  3  2020 lib64 -> usr/lib64
drwx------   2 root root   6 Dec  4  2020 lost+found
drwxr-xr-x   2 root root   6 Nov  3  2020 media
drwxr-xr-x   2 root root   6 Nov  3  2020 mnt
drwxr-xr-x   2 root root   6 Nov  3  2020 opt
dr-xr-xr-x 126 root root   0 Aug 22 13:10 proc
dr-xr-x---   2 root root 162 Dec  4  2020 root
drwxr-xr-x  11 root root 163 Dec  4  2020 run
lrwxrwxrwx   1 root root   8 Nov  3  2020 sbin -> usr/sbin
drwxr-xr-x   2 root root   6 Nov  3  2020 srv
dr-xr-xr-x  13 root root   0 Aug 22 13:10 sys
drwxrwxrwt   7 root root 145 Dec  4  2020 tmp
drwxr-xr-x  12 root root 144 Dec  4  2020 usr
drwxr-xr-x  20 root root 262 Dec  4  2020 var

```



> 测试`entrypoint`

```shell
# dockerfile-enrtypoint-test

FROM centos
ENTRYPOINT ["ls","-a"]
```

![image-20210822211556568](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822211556568.png)



##### 实战tomcat镜像



1. 准备镜像文件：tomacat压缩包。jdk压缩包
2. 编写dockerfile文件



```shell
# Dockerfile 文件，官方命名 build的时候会自动寻找Dockerfile文件名
FROM centos
MAINTAINER yezidiandian<>

COPY readme.txt /usr/local/readme.txt

ADD jdk-8u11-linux-x64.tar.gz /usr/local/
ADD apache-tomcat-9.0.22.tar.gz /usr/local/

RUN yum -y install vim

ENV MYPATH /usr/local
WORKDIR $MTPATH

ENV JAVA_HOME /usr/local/jdk1.8.0_11
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.22
ENV CATALINA_BASH /usr/local/apache-tomcat-9.0.22
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/bin

EXPOSE 8080

CMD /usr/local/apache-tomcat-9.0.22/bin/startup.sh $$ tail -F /usr/local/apache-tomcat-9.0.22/bin/logs/catalina.out
~                                                                                                                        
~                                                                                                                        
~                                                                                                                        
~                                                                                                                        
~                                                                                                                                                                                               
```



打包 启动容器 访问测试



##### 发布到自己的镜像

注册账号之后

```shell
docker login -u 用户名 -p 密码

docker push 用户名/镜像名:tag
```





### Docker网络



![image-20210822215518527](/Users/zhangting/Library/Application Support/typora-user-images/image-20210822215518527.png)

lo：本机回环地址

Eth0：阿里云内网地址

docker0：docker地址































































