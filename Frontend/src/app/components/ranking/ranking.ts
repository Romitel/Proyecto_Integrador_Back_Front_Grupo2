import { Component } from '@angular/core';

export interface RankingRow {
  p: {
    id: string;
    full_name: string;
    category: 'activo' | 'invitado';
  };
  s: {
    attended: number;
    absences: number;
    cancellations: number;
  };
}

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [],
  templateUrl: './ranking.html'
})
export class Ranking {
  currentUserId = '123'; // Equivalente a session?.user.id

  rows: RankingRow[] = [
    {
      p: { id: '123', full_name: 'Juan Pérez', category: 'activo' },
      s: { attended: 10, absences: 1, cancellations: 0 }
    },
    {
      p: { id: '456', full_name: 'Martín Gómez', category: 'invitado' },
      s: { attended: 6, absences: 0, cancellations: 2 }
    }
  ];

  rankingScore(s: RankingRow['s']): number {
    return 3 * s.attended - 2 * s.absences - 1 * s.cancellations;
  }
}
