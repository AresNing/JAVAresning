## 拉取远程分支代码并合并到本地分支

### git fetch

- 需要在本地额外新建分支的

```bash
# 查看远程分支
git remote -v
# 获取远程指定分支到本地临时新建的分支
# 获取远程master的分支的代码到临时新建的temp
git fetch origin master:temp
# 查看版本差异
# 查看temp分支与当前分支的差异
git diff temp
# 将临时分支temp合并到当前分支
git merge temp
# 删除临时分支
git brach -D temp
```

- 不需要在本地新建分支

```bash
# 查看远程分支
git remote -v
# 获取远程分支到本地
# 获取远程的master分支
git fetch origin master
# 查看版本差异
# 查看远程master分支与本地master分支的差别
git log -p master ..origin/master
# 合并到本地分支
git merge orgin/master
```



### git pull

- 相当于`git fetch`与``git merge`一起使用，但是这样使用容易出错，所以推荐第一种方式

```bash
# 查看远程分支
git remote -v
# 拉取并合并到本地分支
# 拉取远程的master分支合并到当前分支
git pull origin master
```

































