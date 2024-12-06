import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../services/campaign.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-displaycampaigns',
  imports: [CommonModule, FormsModule],
  templateUrl: './displaycampaigns.component.html',
  styleUrl: './displaycampaigns.component.css'
})
export class DisplaycampaignsComponent implements OnInit {

  selectedStatus: string = ''; // Statut de progression sélectionné
  selectedUniverse: string = ''; // Statut de progression sélectionné

  campaigns: any[] = []; // Liste des campagnes

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.campaignService.getCampaigns().subscribe(
      (data) => {
        this.campaigns = data;
        console.log('Campagnes chargées:', this.campaigns);
      },
      (error) => {
        console.error('Erreur lors du chargement des campagnes:', error);
      }
    );
  }

  deleteCampaign(id: number): void {
    if (confirm('THIS WILL DELETE YOUR CAMPAIGN. ARE YOU SURE YOU WANT TO DELETE?')) {
      this.campaignService.deleteCampaign(id).subscribe(() => {
        console.log(`Campagne avec l'ID ${id} supprimée.`);
        this.campaigns = this.campaigns.filter((campaign) => campaign.id !== id); // Mise à jour locale
      });
    }
  }

  // getFilteredCampaigns() {
  //   if (!this.selectedStatus) {
  //     return this.campaigns; // Pas de filtre, afficher tout
  //   }
  //   return this.campaigns.filter(campaign => campaign.progress_status.toLowerCase() == this.selectedStatus.toLocaleLowerCase());
  // }

  // getFilteredUniverse() {
  //   if (!this.selectedUniverse) {
  //     return this.campaigns;
  //   }
  //   return this.campaigns.filter(campaign => campaign.progress_Universe.toLowerCase() == this.selectedUniverse.toLocaleLowerCase());

  // }

  getCombinedFilters(): any[] {
    return this.campaigns.filter(campaign => {
      const statusMatch = !this.selectedStatus || campaign.progress_status.toLowerCase() === this.selectedStatus.toLowerCase();
      const universeMatch = !this.selectedUniverse || campaign.universe.toLowerCase() === this.selectedUniverse.toLowerCase();
      return statusMatch && universeMatch;
    });
  }
  
  resetFilters() {
    this.selectedStatus = '';
    this.selectedUniverse = '';
  }
}
