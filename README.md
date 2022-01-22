# 😛 Build a Simple Virtual DOM from Scrath
### To run
```
$ npm install
$ npm run dev
```

## 🗒 Side Notes
all variable with

- $ - when referring to real doms, e.g ```$div, $el, $app```
- v - when referring to virtual doms, e.g ```vDiv, vEl, vApp```

## 📺 The way how to show elements on browser

### 1. createElement.js
just create object    

▼ like this plain object, this is virtual DOM   
![create_element](https://user-images.githubusercontent.com/24407811/150615887-3c26a071-1c20-41fd-9823-121087f2a576.png)


### 2.render.js
create actual DOM from virtual DOM object   

▼ like this ```<div id='app'></div>```  
![render](https://user-images.githubusercontent.com/24407811/150615952-7b6e4419-7dec-4a9a-bab9-a697b3e36b07.png)

### 3.mount.js
set actual DOM to target element in html file   

▼ then we can see on browser    
![Screenshot 2022-01-22 at 01 18 42](https://user-images.githubusercontent.com/24407811/150616013-8c32588e-354c-4b3f-8b66-9adcf5549bb9.png)

## ‼ Problem
If I execute code which render every 1 sec, all elements re-render every sec as well    
▼ look at that, input renders every second, so I cant write anything !!! 😱   
![render_all](https://user-images.githubusercontent.com/24407811/150649956-1f47ac84-9b5e-44c5-ac15-db6a364b98b2.gif)    
![everytime_render2](https://user-images.githubusercontent.com/24407811/150650070-43338571-d603-43d3-878e-6a7a48e2eb9c.gif)

## ❓ How to solve it
### diff.js       
1, find different node between old virtual DOM and new virtual DOM      
2, return function the way how to change this node   
    
▼ now input doesnt render, so we can write normaly!!
![not_render_input](https://user-images.githubusercontent.com/24407811/150653320-fa939086-953d-457e-9824-6ded8cb80bd6.gif)    
![not_render2](https://user-images.githubusercontent.com/24407811/150653383-fd2215e2-2d9d-438c-9131-6aab1f9dca2f.gif)

## 🌏 Others
this algorithm of searching different node is **"stack"**, this is not used in current React.js.    
this **"stack"** has problem which need to search different node recursively from top node.
    
Now algorithm is called **"Fiber"**. It is created by singly linked list, so it doesn't need to search different node recursively because each nodes are independent.   
    
[React Fiberの「Fiber」とはなんなのか勉強してみた](https://qiita.com/seya/items/a655adb340af3b6690b5)   
[A deep dive into React Fiber internals
](https://blog.logrocket.com/deep-dive-into-react-fiber-internals/)   

## 📕 reference
[VIDEO - Building a Simple Virtual DOM from Scratch - Jason Yu](https://www.youtube.com/watch?v=85gJMUEcnkc)    
This video helped me sooooooooo much !!


