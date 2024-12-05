import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../services/campaign.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-displaycampaigns',
  imports: [CommonModule],
  templateUrl: './displaycampaigns.component.html',
  styleUrl: './displaycampaigns.component.css'
})
export class DisplaycampaignsComponent implements OnInit {
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
}
