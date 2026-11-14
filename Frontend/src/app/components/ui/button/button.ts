import { Component, computed, input } from '@angular/core';

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'lime'
  | 'pitch';

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

@Component({
  selector: 'button[appButton], a[appButton]',
  standalone: true,
  template: `<ng-content />`,
  host: {
    '[class]': 'computedClasses()'
  },
  styles: [`
    :host {
      transition: all 0.15s ease-in-out;
    }

    /* Variante 'lime' personalizada */
    :host.btn-lime {
      background-color: #a3e635;
      color: #1a2e05;
      border-color: transparent;
      font-weight: 600;
      box-shadow: 0 4px 14px 0 rgba(163, 230, 53, 0.35);
    }
    :host.btn-lime:hover:not(:disabled) {
      filter: brightness(0.95);
    }

    /* Variante 'pitch' personalizada (para fondos oscuros como el header o hero) */
    :host.btn-pitch {
      border: 1px solid rgba(255, 255, 255, 0.3);
      background-color: transparent;
      color: #ffffff;
    }
    :host.btn-pitch:hover:not(:disabled) {
      background-color: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }

    /* Variante 'ghost' */
    :host.btn-ghost {
      background-color: transparent;
      border-color: transparent;
      color: inherit;
    }
    :host.btn-ghost:hover:not(:disabled) {
      background-color: rgba(0, 0, 0, 0.06);
    }

    /* Tamaño cuadrado 'icon' */
    :host.btn-icon {
      width: 2.25rem;
      height: 2.25rem;
      padding: 0;
    }
  `]
})
export class ButtonComponent {
  variant = input<ButtonVariant>('default');
  size = input<ButtonSize>('default');
  class = input<string>('');

  private readonly variantMap: Record<ButtonVariant, string> = {
    default: 'btn-primary shadow-sm',
    destructive: 'btn-danger shadow-sm',
    outline: 'btn-outline-secondary bg-body shadow-sm',
    secondary: 'btn-secondary shadow-sm',
    ghost: 'btn-ghost',
    link: 'btn-link text-decoration-none',
    lime: 'btn-lime',
    pitch: 'btn-pitch'
  };

  private readonly sizeMap: Record<ButtonSize, string> = {
    default: '',
    sm: 'btn-sm',
    lg: 'btn-lg px-4',
    icon: 'btn-icon'
  };

  computedClasses = computed(() => {
    const base = 'btn d-inline-flex align-items-center justify-content-center gap-2 fw-medium text-nowrap';
    const vClass = this.variantMap[this.variant()] ?? this.variantMap.default;
    const sClass = this.sizeMap[this.size()] ?? '';
    return `${base} ${vClass} ${sClass} ${this.class()}`.trim();
  });
}