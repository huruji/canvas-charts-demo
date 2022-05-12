import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app'

ReactDOM.render(<App/>, document.querySelector('#app'))

const a:object = function(){}

const b:String = '123'


interface Video {
  type: 'youtube' | 'bili' | 'netflix';
  url: string
}

const vType:Partial<Video> = {}

// const a: number = 12
// const b = <string><unknown>a;

// const age:number = 12
// const age = 12
// const b = a as unknown as string

class Cat {
  public name = 'cat'
  public getName() {
    return this.name
  }
}

class Cat {
  name = 'cat'
  getName() {
    return this.name
  }
}


// const body = document.querySelector('body')
// const bodyStyle = body.style
// bodyStyle.border = "1px solid red"; // 再一次 回流+重绘
// bodyStyle.color = "black"; // 再一次重绘
// bodyStyle.fontSize = "20px"; // 再一次 回流+重绘
// bodyStyle.backgroundColor = "#ccc"; // 再一次 重绘

// body.appendChild(document.createElement('div'));


// const body = document.querySelector('body')
// const bodyStyle = body.style
// bodyStyle.border = "1px solid red";
// bodyStyle.color = "black";
// bodyStyle.fontSize = "20px";
// bodyStyle.backgroundColor = "#ccc";

// body.appendChild(document.createElement('div'));


// function getName() {
//   this.name = 'javascript'
// }

// getName()


// const elements = {
//   button: document.getElementById('button')
// };
// function removeButton() {
//   document.body.removeChild(document.getElementById('button'));
// }
// removeButton()


// let timer = setInterval(() => {
//   const node = document.querySelector('#node')
//   if(node) {
//     clearInterval(timer)
//   }
// });


// function getName() {
//   return 'huruji'
// }

// // updateName 没有被用到，希望被 tree shaking 优化
// function updateName() {
//   return 'saber'
// }

// export {
//   getName,
//   updateName
// }


// 类方法 updateName 没有被项目用到，希望被 tree shaking 优化
// class Name {
//   getName() {
//     return 'react'
//   }

//   updateName() {
//     return 'vue'
//   }
// }

// export {
//   Name
// }

// 清除永远不可能运行的代码 if(false)
// function main() {
//   if (false) {
//     console.log('react')
//   }
//   return 'vue'
// }

// const content = (
// <ul className="list">
//   <li>{name}</li>
//   javascript
// </ul>
// )

// const content = React.createElement("ul", {
//   className: "list",
//   children: [
//     'li',
//     'javascript'
//   ]
// });

// const content = React.createElement(
//   "ul", {
//     className: "list"
//   },
//   React.createElement("li", null, name), "javascript");


const content = React.createElement(
  "ul", {
    className: "list"
  });

