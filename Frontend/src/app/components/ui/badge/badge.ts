import { Component, computed, input } from '@angular/core';

export type BadgeVariant =
  'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'lime' | 'muted';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <span [class]="computedClasses()">
      <ng-content />
    </span>
  `,
  styles: [
    `
      .badge-lime {
        background-color: var(--accent);
        color: var(--accent-foreground);
      }
      .badge-secondary-custom {
        background-color: var(--secondary);
        color: var(--secondary-foreground);
      }
      .badge-muted-custom {
        background-color: var(--muted);
        color: var(--muted-foreground);
      }
    `,
  ],
})
export class BadgeComponent {
  variant = input<BadgeVariant>('default');
  class = input<string>('');

  private readonly variantMap: Record<BadgeVariant, string> = {
    default: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    destructive: 'bg-danger text-white',
    outline: 'border border-secondary text-body bg-transparent',
    success: 'bg-success-subtle text-success-emphasis border border-success-subtle',
    warning: 'bg-warning-subtle text-warning-emphasis border border-warning-subtle',
    lime: 'badge-lime',
    muted: 'bg-body-secondary text-body-secondary',
  };

  computedClasses = computed(() => {
    const base = 'badge d-inline-flex align-items-center fw-semibold px-2 py-1 rounded-4';
    const variantClasses = this.variantMap[this.variant()] ?? this.variantMap.default;
    return `${base} ${variantClasses} ${this.class()}`.trim();
  });
}
