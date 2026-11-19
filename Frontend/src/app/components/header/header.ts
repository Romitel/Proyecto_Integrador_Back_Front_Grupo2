import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  LucideCalendarDays,
  LucideClockFading,
  LucideDynamicIcon,
  LucideIcon,
  LucideLogOut,
  LucideTrophy,
  LucideUsers,
} from '@lucide/angular';
import { BadgeComponent, ButtonComponent, Logo } from '../../components/ui/index';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}
@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    BadgeComponent,
    ButtonComponent,
    LucideLogOut,
    LucideDynamicIcon,
    Logo,
  ],
  templateUrl: './header.html',
  styleUrls: ['../../../styles.css', './header.css'],
})
export class Header {
  private router = inject(Router);

  isAdmin = signal<boolean>(true);
  profile = signal<{ full_name: string; category: 'activo' | 'invitado' } | null>({
    full_name: 'Juan Pérez',
    category: 'activo',
  });

  nav = computed<NavItem[]>(() => [
    { to: '/eventos', label: 'Convocatorias', icon: LucideCalendarDays },
    { to: '/ranking', label: 'Ranking', icon: LucideTrophy },
    { to: '/historial', label: 'Mi historial', icon: LucideClockFading },
    { to: '/integrantes', label: 'Integrantes', icon: LucideUsers },
  ]);

  signOut() {
    this.router.navigate(['/']);
  }
}
