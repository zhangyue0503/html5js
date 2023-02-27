import helloWorld from "./hello-world"
import imgsrc from '../assets/bg.png'
import txtsrc from '../assets/a.txt'
import './style.css'
import './style.less'

helloWorld()

const img = document.createElement('img')
img.src = imgsrc
document.body.appendChild(img)

const block = document.createElement('div')
block.textContent = txtsrc
document.body.appendChild(block)

document.body.classList.add('hello')