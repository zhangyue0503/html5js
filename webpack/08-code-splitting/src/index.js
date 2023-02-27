import helloWorld from "./hello-world"
import imgsrc from '../assets/bg.png'
import txtsrc from '../assets/a.txt'
import './style.css'
import './style.less'
import './async-module'


helloWorld()

const img = document.createElement('img')
img.src = imgsrc
document.body.appendChild(img)

const block = document.createElement('div')
block.textContent = txtsrc
document.body.appendChild(block)

document.body.classList.add('hello')


const button = document.createElement('button')
button.textContent = '点击执行加法运算'
button.addEventListener('click', ()=>{
    import(/* webpackChunkName:'math' */ './math.js').then(({add})=>{
        console.log(add(4,5))
    })
})
document.body.appendChild(button)