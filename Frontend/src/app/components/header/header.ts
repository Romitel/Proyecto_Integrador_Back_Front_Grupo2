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
import { BadgeComponent, ButtonComponent } from '../../components/ui/index';
import { Logo } from '../ui/logo/logo';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, BadgeComponent, ButtonComponent, LucideLogOut, LucideDynamicIcon, Logo],
  templateUrl: './header.html',
  styleUrls: ['../../../styles.css', './header.css']
})
export class Header {
    private router = inject(Router);

  // Mock temporal mientras no usas auth (cámbialo a false para probar vista de usuario normal)
  isAdmin = signal<boolean>(true);
  profile = signal<{ full_name: string; category: 'activo' | 'invitado' } | null>({
    full_name: 'Juan Pérez',
    category: 'activo'
  });

  // Navegación reactiva según si es admin o no
  nav = computed<NavItem[]>(() => [
    { to: '/eventos', label: 'Convocatorias', icon: LucideCalendarDays },
    { to: '/ranking', label: 'Ranking', icon: LucideTrophy },
    { to: '/historial', label: 'Mi historial', icon: LucideClockFading },
    ...(this.isAdmin() ? [{ to: '/integrantes', label: 'Integrantes', icon: LucideUsers }] : [])
  ]);

  signOut() {
    // Como aún no hay auth, redirige al inicio o a donde prefieras
    this.router.navigate(['/']);
  }
}