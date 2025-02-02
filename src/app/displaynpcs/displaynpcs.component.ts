import { Component, OnInit } from '@angular/core';
import { NpcService } from '../services/npc.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // Pour naviguer vers le formulaire
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-display-npcs',
  imports: [CommonModule, FormsModule],
  templateUrl: './displaynpcs.component.html',
  styleUrls: ['./displaynpcs.component.css']
})
export class DisplayNpcsComponent implements OnInit {

  npcs: any[] = [];
  selectedType: string = '';

  constructor(
    private campaignService: CampaignService,
    private npcService: NpcService,
    private router: Router // Injecter le Router
  ) {}

  ngOnInit(): void {
    this.loadNpcs();
  }

  loadNpcs(): void {
    this.npcService.getAllNpcs().subscribe(
      (data) => {
        this.npcs = data;
        console.log('NPCs chargés:', this.npcs);
      },
      (error) => {
        console.error('Erreur lors du chargement des NPCs:', error);
      }
    );
  }

  getFilteredNpcs(): any[] {
    return this.npcs.filter(npc => 
      !this.selectedType || npc.type.toLowerCase() === this.selectedType.toLowerCase()
    );
  }

  resetFilter(): void {
    this.selectedType = '';
  }

  editNpc(npcId: number): void {
    this.router.navigate(['/npc/create'], { queryParams: { id: npcId } });
  }
  
  
  deleteNpc(npcId: string) {
    if (confirm('Are you sure you want to delete this NPC?')) {
      this.npcService.deleteNpc(npcId).subscribe(
        () => {
          console.log('NPC supprimé avec succès !');
          this.loadNpcs(); // Recharger la liste après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression du NPC:', error);
        }
      );
    }
  }
  
}
