import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator-view',
  templateUrl: './calculator-view.component.html',
  styleUrls: ['./calculator-view.component.css']
})
export class CalculatorViewComponent {
  numeroActual: string | null = null;
  numeroAnterior: string | null = null;
  operador: string | null = null;

  private operaciones: string[] = ['+', '-', '×', '/'];
  fecha: string = '';
  salida: string = '';


  agregar(valor: string): void {
    console.log(this.numeroActual);
    if (this.operaciones.includes(valor)) {
      if (this.operador !== null) {
        return;
      } else if (this.salida === '' && (valor === '-' || valor === '+')) {
        this.salida = valor + 'S/';
        this.numeroActual = valor;
        return;
      } else if (this.salida === '' && valor !== '-' && valor !== '+') {
        return;
      } else if (this.numeroActual === '-' || this.numeroActual === '+') {
        return;
      } else {
        this.operador = valor;
        this.numeroAnterior = this.numeroActual;
        this.numeroActual = '';
        this.salida += valor;
      }
    } else if (valor === '=') {
      if (this.numeroActual === null) {
        this.numeroActual = this.numeroAnterior;
      } else {
        this.calcular();
      }
    } else if (this.salida === '') {
      if (valor === '.') {
        this.salida = 'S/0.';
        this.numeroActual = '0.';
      } else {
        this.salida = 'S/' + valor;
        if (this.numeroActual) {
          this.numeroActual += valor;
        } else {
          this.numeroActual = valor;
        }
      }
    } else if (this.salida === 'S/0' && valor === '.') {
      this.salida = 'S/0.';
      this.numeroActual = '0.';
    } else if (this.salida[this.salida.length - 1] === this.operador) {
      if (valor === '.') {
        this.salida += 'S/0.';
        this.numeroActual = '0.';
      } else {
        this.salida += 'S/' + valor;
        this.numeroActual += valor;
      }
    } else if (
      valor === '.' &&
      this.numeroActual &&
      this.numeroActual.includes('.')
    ) {
      this.salida = this.salida;
      this.numeroActual = this.numeroActual;
    } else if (this.numeroActual === '0') {
      if (valor === '0') {
        this.salida = this.salida;
        this.numeroActual = this.numeroActual;
      } else if (valor === '.') {
        this.salida += valor;
        this.numeroActual += valor;
      } else {
        this.salida = this.salida.slice(0, -1) + valor;
        this.numeroActual = valor;
      }
    } else {
      this.salida += valor;
      if (this.numeroActual) {
        this.numeroActual += valor;
      } else {
        this.numeroActual = valor;
      }
    }
    console.log( this.numeroActual, this.numeroAnterior, this.operador, this.salida );
  }


  calcular(): void {
    switch (this.operador) {
      case '+':
        this.numeroActual = (
          Number(this.numeroActual) + Number(this.numeroAnterior)
        ).toString();
        break;
      case '-':
        this.numeroActual = (
          Number(this.numeroAnterior) - Number(this.numeroActual)
        ).toString();
        break;
      case '×':
        this.numeroActual = (
          Number(this.numeroActual) * Number(this.numeroAnterior)
        ).toString();
        break;
      case '/':
        this.numeroActual = (
          Number(this.numeroAnterior) / Number(this.numeroActual)
        ).toString();
        break;
    }
    this.numeroAnterior = null;
    this.operador = null;
    if (this.numeroActual) {
      if (this.numeroActual[0] === '-') {
        this.salida = '-' + 'S/' + this.numeroActual.slice(1);
      } else {
        this.salida = 'S/' + this.numeroActual;
      }
    }
  }

  limpiar(): void {
    this.salida = '';
    this.numeroActual = null;
    this.numeroAnterior = null;
    this.operador = null; 
  }

  removerDigito(): void {
    console.log('---');
    console.log('numeroActual ' + this.numeroActual);
    console.log('numeroAnterior ' + this.numeroAnterior);
    console.log('operador ' + this.operador);
    console.log(`length: ${this.numeroActual?.length}`);
    console.log('salida ' + this.salida);
   
    // Si el ‘numeroActual’ tiene un solo digito y el ‘numeroAnterior’ y el ‘operando’ son null, el ‘numeroActual’ debe cambiar a 0.
    if ( this.numeroActual && this.numeroActual.length === 1 && this.numeroAnterior === null && this.operador === null )
       {
      this.numeroActual = '0';
    }

    // Si el ‘numeroActual’ tiene un solo digito, pero el ‘numeroAnterior’ y el ‘operando’ no son null, el ‘numeroActual’ debe setearse a null.
    else if (
      this.numeroActual &&
      this.numeroActual.length === 1 &&
      this.numeroAnterior !== null &&
      this.operador !== null
    ) {
      console.log('caso2');
      this.numeroActual = null;
    }

    //
    else if (
      this.numeroActual === null &&
      this.numeroAnterior !== null &&
      this.operador !== null
    ) {
      this.numeroActual = this.numeroAnterior;
      this.numeroAnterior = null;
      this.operador = null;
    }

    // Cuando el usuario haga click en debe remover el último dígito de ‘numeroActual’.
    else if (this.numeroActual) {
      if (this.numeroActual.length === 1) {
        this.numeroActual = '0';
        this.salida = this.salida.slice(0, -1) + '0';
      } else {
        this.numeroActual = this.numeroActual.slice(0, -1);
        this.salida = this.salida.slice(0, -1);
      }
    }

    console.log('---');
    console.log('numeroActual ' + this.numeroActual);
    console.log('numeroAnterior ' + this.numeroAnterior);
    console.log('operador ' + this.operador);
    console.log(`length: ${this.numeroActual?.length}`);
    console.log('salida ' + this.salida);
  }



  getDate(): void {
    let date = new Date();
    this.fecha = date.toLocaleDateString();
  }
}