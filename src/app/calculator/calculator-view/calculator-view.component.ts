import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator-view',
  templateUrl: './calculator-view.component.html',
  styleUrls: ['./calculator-view.component.css']
})
export class CalculatorViewComponent {
  private numeroActual: number = 0;
  private numeroAnterior: number = 0;
  private operador: string = '';
  private resultado: number = 0;
  private operaciones: string[] = ['+', '-', '*', '/'];
  salida: string = '';

  agregar(valor: string): void {
    if (this.operaciones.includes(valor)) {
      this.operador = valor;
      this.numeroActual = Number(this.salida.substring(2));
      this.salida = this.salida + valor;
    } 
    else if (valor === '=') {
      console.log(this.salida.split(this.operador)[1].substring(2));
      this.numeroAnterior = Number(this.salida.split(this.operador)[1].substring(2));
      this.calcular();
    } 
    else if (valor === 'C') {
      this.limpiar();
    }
    else if (this.salida === '') {
      this.salida = "S/" + valor;
    }
    else if (this.salida[this.salida.length-1] === this.operador) {
      this.salida = this.salida + "S/" + valor;
    }
    else {
      this.salida = this.salida + valor;
    }
  }

  calcular(): void {
    switch (this.operador) {
      case '+':
        this.resultado = this.numeroActual + this.numeroAnterior;
        break;
      case '-':
        this.resultado = this.numeroActual - this.numeroAnterior;
        break;
      case '*':
        this.resultado = this.numeroActual * this.numeroAnterior;
        break;
      case '/':
        this.resultado = this.numeroActual / this.numeroAnterior;
        break;
    }
    this.salida = "S/" + this.resultado.toString();
    console.log(this.numeroActual, this.numeroAnterior, this.operador, this.resultado);
  }

  limpiar(): void {
    this.salida = '';
  }
}


