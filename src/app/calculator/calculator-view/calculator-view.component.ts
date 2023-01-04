import { Component, Input } from '@angular/core';
import { __values } from 'tslib';

@Component({
  selector: 'app-calculator-view',
  templateUrl: './calculator-view.component.html',
  styleUrls: ['./calculator-view.component.css'],
})
export class CalculatorViewComponent {
  numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  private numeroActual: number = 0;
  private numeroAnterior: number = 0;
  private operador: string = '';
  private resultado: number = 0;
  private operaciones: string[] = ['+', '-', '*', '/'];
  salida: string = '';
  claseIcon: string = 'fa-solid fa-check';

  agregar(valor: string): void {
    if (this.operaciones.includes(valor)) {
      this.operador = valor;

      this.numeroActual = Number(this.salida.substring(2));
      this.salida = this.salida + valor;
      if (
        this.salida.includes('+') ||
        this.salida.includes('-') ||
        this.salida.includes('*') ||
        this.salida.includes('/')
      ) {
        this.claseIcon = 'fa-solid fa-equals';
      }
    } else if (valor === '=') {
      console.log(this.salida.split(this.operador)[1].substring(2));
      this.numeroAnterior = Number(
        this.salida.split(this.operador)[1].substring(2)
      );
      this.calcular();
    } else if (valor === 'C') {
      // this.limpiar();
    } else if (this.salida === '' || this.salida === '0') {
      this.salida = 'S/' + valor;
    } else if (this.salida[this.salida.length - 1] === this.operador) {
      this.salida = this.salida + 'S/' + valor;
    } else {
      this.salida = this.salida + valor;
    }
    if (this.salida.includes('S/00') || this.salida.includes('..')) {
      this.salida = this.salida.slice(0, this.salida.length - 1);
    }
  }

  //---
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

    this.salida = 'S/' + this.resultado.toString();
    console.log(
      this.numeroActual,
      this.numeroAnterior,
      this.operador,
      this.resultado
    );
  }

  remover(): void {
    this.salida = this.salida.slice(0, this.salida.length - 1);
  }

  limpiar(): void {
    this.salida = '0';
  }
}
