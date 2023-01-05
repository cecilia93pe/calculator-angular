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
  category: CategoryType = {
    name: 'Groceries',
    color: '#3efa30',
    icon: 'iconName'
  }

  previousNumber: string = ''
  currentNumber: string = ''
  result: string = ''
  formatResult: string = ''

  handleClickButton = ($event: any) => {
    $event.stopPropagation()
    const element = $event.currentTarget
    const action = element.dataset.calculator
    if (this.numbers.includes(action)) {
      if (this.currentNumber !== '0') {
        this.currentNumber += action
        this.result = this.result + action
        this.formatResult = this.formatResult + action
      }
    }
    console.log(this.currentNumber, 'currentnumebr')
    if (action === 'decimal' && (this.currentNumber.indexOf('.') < 0)) {
      if (this.currentNumber === '') {
        this.currentNumber += '0.'
        this.result = this.result + '0.'
        this.formatResult = this.formatResult + '0.'
      } else {
        this.currentNumber += '.'
        this.result = this.result + '.'
        this.formatResult = this.formatResult + '.'
      }
    }
    if (this.operators.includes(action) && this.currentNumber) {

      switch (action) {
        case this.operators[0]:
          this.result += ' / '
        break
        case this.operators[1]:
          this.result += ' * '
        break
        case this.operators[2]:
          this.result += ' - '
        break
        case this.operators[3]:
          this.result += ' + '
          break
      }
      this.formatResult = this.formatResult + ' ' + action + ' '
      this.currentNumber = ''
    }

    if (action === 'calculate') {
      this.formatResult = String(eval(this.result))
    }

    if (action === 'clearAll') {
      this.formatResult = ''
      this.result = ''
      this.currentNumber = ''
    }

    if (action === 'clear') {
      console.log(this.formatResult, 'formatresul')
      const lastElement = this.formatResult.slice(-1)
      console.log(lastElement, 'lastEleme')
      if (lastElement === ' ') {
        this.formatResult = this.formatResult.slice(0, -3)
        console.log('1')
      } else {
        this.formatResult = this.formatResult.slice(0, -1)
        console.log('2')
      }
    }
  }

}
