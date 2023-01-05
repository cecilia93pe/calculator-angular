import { Component, OnChanges, SimpleChanges } from '@angular/core';

type CategoryType = {
  name: string
  color: string
  icon: string
}

@Component({
  selector: 'app-calculator-view',
  templateUrl: './calculator-view.component.html',
  styleUrls: ['./calculator-view.component.css']
})

export class CalculatorViewComponent {
  options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  today = new Date()
  date: any = this.today.toLocaleDateString("en-US", this.options)
  numbers: Array<string> = ['1','2','3','4','5','6','7','8','9','0']
  operators: Array<string> = ['÷', '×', '−', '+']
  operatorsEval: any = {
    '÷': '/',
    '×': '*',
    '−': '-',
    '+': '+'
  }
  category: CategoryType = {
    name: 'Groceries',
    color: '#3efa30',
    icon: 'iconName'
  }

  currentNumber: string | null = null
  result: string = ''
  formatResult: string = ''
  isSubmit: boolean = false

  handleClickButton = ($event: any) => {
    $event.stopPropagation()
    const element = $event.currentTarget
    const action = element.dataset.calculator

    if (this.numbers.includes(action)) {
      this.addNumber(action)
    }

    if ( action === 'decimal' ) {
      this.addDecimal()
    }

    if (this.operators.includes(action) && this.currentNumber) {
      this.buildedResult(action)
      this.currentNumber = null
    }

    if (action === 'calculate') {
      this.calculate()
    }

    if (action === 'clearAll') {
      this.clearAll()
    }

    if (action === 'clear') {
      this.clearResults()
    }
    this.setIsSubmit()
  }

  buildedResult = (operator: string) => {
    const lastElement = this.formatResult.slice(-1)

    let isCanAddOperator: boolean = true

    this.formatResult.split(' ').forEach((item) => {
      if (this.operators.includes(item)) {
        isCanAddOperator = false
      }
    })

    if (isCanAddOperator && lastElement !== '.') {
      this.result += ` ${this.operatorsEval[operator]} `
      this.formatResult = this.formatResult + ' ' + operator + ' '
    }
  }

  setIsSubmit = () => {
    if (this.formatResult.split(' ').length === 3 && this.formatResult.split(' ')[2] !== '') {
      this.isSubmit = true
    } else {
      this.isSubmit = false
    }
  }

  clearResults = () => {
    const lastElement = this.formatResult.slice(-1)
    if (lastElement === ' ') {
      this.formatResult = this.formatResult.slice(0, -3)
    } else {
      this.formatResult = this.formatResult.slice(0, -1)
    }
  }

  clearAll = () => {
    this.formatResult = ''
    this.result = ''
    this.currentNumber = null
  }

  calculate = () => {
    const lastElement = this.formatResult.slice(-1)
    if (lastElement !== ' ' && lastElement !== '.') {
      const resultAll = String(eval(this.result))

      if (resultAll.split('.').length === 1) {
        this.formatResult = String(eval(this.result))
      } else {
        this.formatResult = String(Number(resultAll).toFixed(2))
      }
      this.currentNumber = this.formatResult
    }
  }

  addDecimal = () => {
    if (this.currentNumber && this.currentNumber.indexOf('.') < 0) {
      this.currentNumber += '.'
      this.result = this.result + '.'
      this.formatResult = this.formatResult + '.'
    }

    if (this.currentNumber === null) {
      if (this.formatResult.length === 0) {
        this.currentNumber = '0.'
        this.result = this.result + '0.'
        this.formatResult = this.formatResult + '0.'
      }
    }
  }

  addNumber = (action: string) => {
    if (this.currentNumber !== '0') {
      if (this.currentNumber === null) {
        this.currentNumber = action
      } else {
        this.currentNumber += action
      }
      this.result = this.result + action
      this.formatResult = this.formatResult + action
    }
  }
}
