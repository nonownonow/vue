import { join } from 'fxjs2'
import print from './print'
console.log('NODE_ENV', process.env.NODE_ENV)
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
