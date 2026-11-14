import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [RouterLink],
  template: `<div>
            <a routerLink="/" class="logo">
                ESTOY<span class="text-accent">!</span>
            </a>
        </div>`,
  styleUrl: '../../../../styles.css',
})
export class Logo {}
