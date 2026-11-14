import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shared-layout',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './shared-layout.html',
  styleUrl: './shared-layout.css',
})
export class SharedLayout {}
