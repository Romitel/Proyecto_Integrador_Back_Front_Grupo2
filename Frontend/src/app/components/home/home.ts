import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { ButtonComponent } from '../../components/ui';
import { Footer } from '../footer/footer';
import { Logo } from '../ui/logo/logo';

interface FeatureItem {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ButtonComponent, Footer, Logo],
  templateUrl: './home.html',
  styleUrls: ['../../../styles.css','./home.css']
})
export class Home implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  // Como aún no usas auth, ambos botones apuntan directo a /convocatorias
  targetRoute = '/eventos';

  features: FeatureItem[] = [
    {
      icon: 'bi-calendar-check',
      title: 'Convocatorias claras',
      text: 'Disciplina, fecha, lugar, cupo máximo y mínimo en un solo lugar.'
    },
    {
      icon: 'bi-shield-check',
      title: 'Prioridad para activos',
      text: 'El grupo habitual confirma primero; los invitados se suman 24 h antes.'
    },
    {
      icon: 'bi-list-ol',
      title: 'Lista de espera y ranking',
      text: 'Si no hay lugar, se ordena por reglas conocidas por todos.'
    },
    {
      icon: 'bi-people',
      title: 'Asistencia real',
      text: 'El organizador registra quién fue. Confirmar no es lo mismo que estar.'
    },
    {
      icon: 'bi-geo-alt',
      title: 'Cómo llegar',
      text: 'Ubicación del predio con acceso directo a Google Maps.'
    },
    {
      icon: 'bi-share',
      title: 'Compartí por WhatsApp',
      text: 'Un enlace con todos los datos del partido, listo para mandar.'
    }
  ];

  ngOnInit() {
    this.titleService.setTitle('ESTOY — Organizá tus partidos sin perseguir a nadie por WhatsApp');
    this.metaService.updateTag({
      name: 'description',
      content: 'Convocatorias, cupos, lista de espera, ranking y asistencia para grupos de deporte amateur.'
    });
  }
}