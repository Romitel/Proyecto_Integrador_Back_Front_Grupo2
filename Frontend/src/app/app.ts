import { Component, computed, signal } from '@angular/core';
import { Header } from './components/header/header';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggle, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // protected readonly title = signal('Guillermo');
  protected readonly contador = signal(0);
  protected readonly esCero = computed(() => this.contador() === 0);

  sumarUno() {
    this.contador.update((value) => (value += 1));
  }
  restarUno() {
    this.contador.update((value) => {
      if (value < 1) return value;

      return (value -= 1);
    });
  }
}
