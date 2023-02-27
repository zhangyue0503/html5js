import helloWorld from "./hello-world"
import imgsrc from '../assets/bg.png'
import txtsrc from '../assets/a.txt'

helloWorld()

const img = document.createElement('img')
img.src = imgsrc
document.body.appendChild(img)

const block = document.createElement('div')
block.textContent = txtsrc
document.body.appendChild(block)