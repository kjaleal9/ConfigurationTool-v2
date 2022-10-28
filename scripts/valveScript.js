const ports = document.getElementsByClassName('port')
const numField1 = document.getElementById('num-field-one')
const rotateButton = document.getElementById('rotate-button')
const clearButton = document.getElementById('clear-button')
const valve = document.getElementById('Valve1')

let valveValue = +numField1.innerText
let rotated = false
clearValve()

const subtractValveValue = (element) => {
  valveValue -= +element.attributes['id'].value
  numField1.innerText = valveValue.toString()
}

const addValveValue = (element) => {
  valveValue += +element.attributes['id'].value
  numField1.innerText = valveValue.toString()
}

function rotateValve() {
  rotated = !rotated
  rotated
    ? valve.setAttribute('transform', 'rotate(90) translate(25 -125)')
    : valve.setAttribute('transform', 'rotate(0) translate(0 0)')
}

function changeValveSelect() {
  clearValve()

  let selection = valveSelect.value
  let newValve = document.getElementById(`${selection}`)
  newValve.style['display'] = 'block'
  valveTypesPtr = valveSelect.selectedIndex
  amount = newValve.getAttribute('key')
}

function clearValve() {
  numField1.innerText = '0'
  valveValue = 0
  for (port of ports) {
    port.attributes['stroke'].value = '#d3d3d3'
  }
}

function toggleColor(e) {
  const element = e.target
  element.attributes['stroke'].value === '#d3d3d3'
    ? ((element.attributes['stroke'].value = '#000'), addValveValue(element))
    : ((element.attributes['stroke'].value = '#d3d3d3'),
      subtractValveValue(element))
}

for (port of ports) {
  port.addEventListener('click', toggleColor)
}

rotateButton.addEventListener('click', rotateValve)
clearButton.addEventListener('click', clearValve)
