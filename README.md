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
