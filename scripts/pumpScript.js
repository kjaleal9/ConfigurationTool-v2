const numField2 = document.getElementById('num-field-two')
const pumpSelect = document.getElementById('pumps')
const directionButton = document.getElementById('direction-button')
const typeButton = document.getElementById('type-button')
const baseButton = document.getElementById('base-button')
const pClearButton = document.getElementById('pump-clear-button')
const pumpBase = document.getElementById('base')
const rArrow = document.getElementById('right-arrow')
const lArrow = document.getElementById('left-arrow')
const pumpArray = document.querySelector('#pump-types').children

const pumpTypesArray = [
  'None',
  'Pump1',
  'Pump2',
  'Pump3',
  'Pump4',
  'Pump5',
  'Pump6',
]

const pumpDirectionArr = ['None', 'Right', 'Left']

let pumpValue = +numField2.innerText
let base = false
let pumpTypesPtr = 0
let pumpDirectionPtr = 0
let prevPumpType
let nextPumpType
let amount

initializePump()

const subtractPumpValue = (amount) => {
  pumpValue -= +amount
  numField2.innerText = pumpValue.toString()
}

const addPumpValue = (amount) => {
  pumpValue += +amount
  numField2.innerText = pumpValue.toString()
}

function clearPump() {
  pumpBase.style.display = 'none'
  rArrow.style.display = 'none'
  lArrow.style.display = 'none'
  for (let pump of pumpArray) {
    if (pump !== 'None') {
      pump.style.display = 'none'
    }
  }
  pumpValue = 0
  numField2.innerText = '0'
  pumpTypesPtr = 0
  pumpDirectionPtr = 0
  pumpSelect.selectedIndex = 0
  base = false
}

function changeSelect() {
  clearPump()

  let selection = pumpSelect.value
  if (selection === 'None') {
    clearPump()
    pumpTypesPtr = 0
  } else {
    let newPump = document.getElementById(`${selection}`)
    newPump.style['display'] = 'block'
    pumpTypesPtr = pumpSelect.selectedIndex
    amount = newPump.getAttribute('key')
    addPumpValue(amount)
  }
}

function changePumpDirection() {
  pumpDirectionPtr++

  if (pumpDirectionPtr === pumpDirectionArr.length) {
    pumpDirectionPtr = 0
  }

  switch (pumpDirectionArr[pumpDirectionPtr]) {
    case 'None':
      rArrow.style['display'] = 'none'
      lArrow.style['display'] = 'none'
      subtractPumpValue(lArrow.getAttribute('key'))
      break
    case 'Right':
      rArrow.style['display'] = 'block'
      lArrow.style['display'] = 'none'
      amount = rArrow.getAttribute('key')
      addPumpValue(amount)
      break
    case 'Left':
      lArrow.style['display'] = 'block'
      rArrow.style['display'] = 'none'
      amount = lArrow.getAttribute('key')
      subtractPumpValue(4)
      addPumpValue(amount)
      break
  }
}

function changePumpType() {
  prevPumpType = pumpSelect.children[pumpTypesPtr]
  prevPumpType.removeAttribute('selected')
  let oldPump = document.getElementById(`${prevPumpType.innerHTML}`)
  if (oldPump !== null) {
    oldPump.style['display'] = 'none'
    amount = oldPump.getAttribute('key')
    subtractPumpValue(amount)
  }

  pumpTypesPtr += 1

  if (pumpTypesPtr === pumpTypesArray.length) {
    pumpTypesPtr = 0
    pumpSelect.selectedIndex = pumpTypesPtr
  } else {
    nextPumpType = pumpSelect.children[pumpTypesPtr]
    nextPumpType.setAttribute('selected', 'selected')
    let newPump = document.getElementById(`${nextPumpType.innerHTML}`)
    newPump.style['display'] = 'block'
    pumpSelect.selectedIndex = pumpTypesPtr
    amount = newPump.getAttribute('key')
    addPumpValue(amount)
  }
}

function showBase() {
  base = !base
  base
    ? ((pumpBase.style.display = 'block'), addPumpValue(1))
    : ((pumpBase.style.display = 'none'), subtractPumpValue(1))
}

function initializePump() {
  clearPump()

  for (let pump of pumpTypesArray) {
    let newEl = document.createElement('option')
    newEl.innerText = pump
    newEl.setAttribute('value', pump)
    pumpSelect.appendChild(newEl)
  }
  pumpSelect.addEventListener('change', changeSelect)
  directionButton.addEventListener('click', changePumpDirection)
  typeButton.addEventListener('click', changePumpType)
  baseButton.addEventListener('click', showBase)
  pClearButton.addEventListener('click', clearPump)
}
