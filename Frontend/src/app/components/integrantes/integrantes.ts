// import { Component, OnInit, inject, signal, computed } from '@angular/core';
// import { DatePipe } from '@angular/common';
// import { Title, Meta } from '@angular/platform-browser';
// // import { MembersService } from '../../services/members.service';
// // import { rankingScore, EMPTY_STATS, MemberStats, Profile } from '../../utils/allocation';

// interface MemberRow {
//   p: Profile;
//   s: MemberStats;
//   score: number;
// }

// @Component({
//   selector: 'app-members',
//   standalone: true,
//   imports: [DatePipe],
//   templateUrl: './integrantes.html',
// })
// export class MembersComponent implements OnInit {
//   private membersService = inject(MembersService);
//   private titleService = inject(Title);
//   private metaService = inject(Meta);

//   // State signals
//   //   isAdmin = computed(() => this.authService.isAdmin());
//   isAdmin = computed(() => true);
//   data = signal<{ profiles: Profile[]; stats: Record<string, MemberStats> } | null>(null);
//   toastMessage = signal<{ text: string; type: 'success' | 'danger' } | null>(null);

//   // Pre-compute stats and score for each profile
//   rows = computed<MemberRow[]>(() => {
//     const currentData = this.data();
//     if (!currentData) return [];

//     return currentData.profiles.map((p) => {
//       const s = currentData.stats[p.id] ?? EMPTY_STATS;
//       return {
//         p,
//         s,
//         score: rankingScore(s),
//       };
//     });
//   });

//   ngOnInit(): void {
//     this.setMetaTags();
//     if (this.isAdmin()) {
//       //   this.loadMembers();
//     }
//   }

//   private setMetaTags(): void {
//     this.titleService.setTitle('Integrantes — ESTOY');
//     this.metaService.updateTag({
//       name: 'description',
//       content: 'Administrá los integrantes del grupo y su categoría.',
//     });
//     this.metaService.updateTag({ property: 'og:title', content: 'Integrantes — ESTOY' });
//     this.metaService.updateTag({
//       property: 'og:description',
//       content: 'Gestión de integrantes activos e invitados.',
//     });
//   }

//     loadMembers(): void {
//       this.membersService.getMembers().subscribe({
//         next: (res) => this.data.set(res),
//         error: (err) => this.showToast(err?.message || 'Error al cargar integrantes', 'danger'),
//       });
//     }

//     onCategoryChange(id: string, event: Event): void {
//       const select = event.target as HTMLSelectElement;
//       const category = select.value as 'activo' | 'invitado';

//       this.membersService.updateCategory(id, category).subscribe({
//         next: () => {
//           this.showToast('Categoría actualizada', 'success');
//           this.loadMembers(); // Equivalent to qc.invalidateQueries({ queryKey: ["members"] })
//           this.authService.refresh();
//         },
//         error: (err) => {
//           this.showToast(err?.message || 'Error al actualizar categoría', 'danger');
//           this.loadMembers(); // Revert select UI if request fails
//         },
//       });
//     }

//   private showToast(text: string, type: 'success' | 'danger'): void {
//     this.toastMessage.set({ text, type });
//     setTimeout(() => this.toastMessage.set(null), 3000);
//   }
// }
