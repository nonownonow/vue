import { join } from 'fxjs2'
import print from './print'
import './test.scss'
// import './test2.css'
import imgsrc from './test3.jpg'

console.log(process.env.NODE_ENV)
var b = new Map()
b.set('name', 'ilhwan')
console.log(b.get('name'))
console.log('imgsrc', imgsrc)

function component () {
  const element = document.getElementById('app')
  const button = document.createElement('button')
  button.innerText = 'Click'
  button.addEventListener('click', e => {
    print()
  })
  element.innerText = join(' ', ['hello', 'webpack'])
  element.appendChild(button)
  return element
}

document.body.replaceWith(component())
