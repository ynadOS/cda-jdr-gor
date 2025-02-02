import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CampaignService } from '../services/campaign.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Player {
  id: number;
  name: string;
  class: string;
  level: number;
}

interface NPC {
  id: number;
  name: string;
  role: string;
  description: string;
}

@Component({
  selector: 'app-campaign-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent implements OnInit {
  campaignForm!: FormGroup;
  isEditMode = false;
  currentCampaignId: number | null = null;
  npcs: NPC[] = [];  // Liste des NPCs
  showNPCs = false;   // Pour contrôler l'affichage des NPCs

  constructor(
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.campaignForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      universe: ['', Validators.required],
      context: ['', Validators.required],
      progress_status: ['', Validators.required],
      player_characters: this.fb.array([this.createPlayerCharacter()])
    });
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.currentCampaignId = id;
        this.loadCampaignData(id);
      } else {
        this.isEditMode = false;
      }
    });
  }

  get player_characters(): FormArray {
    return this.campaignForm.get('player_characters') as FormArray;
  }

  createPlayerCharacter(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      class: ['', Validators.required],
      level: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addPlayerCharacter(): void {
    this.player_characters.push(this.createPlayerCharacter());
  }

  removePlayerCharacter(index: number): void {
    this.player_characters.removeAt(index);
  }

  loadCampaignData(id: number): void {
    this.campaignService.getCampaignById(id).subscribe(campaign => {
      this.campaignForm.patchValue({
        name: campaign.name,
        description: campaign.description,
        universe: campaign.universe,
        context: campaign.context,
        progress_status: campaign.progress_status
      });

      // Remplir le tableau des personnages joueurs
      const playerCharacters = campaign.player_characters || [];
      const playerCharactersFormGroups = playerCharacters.map((player: Player) => this.fb.group({
        id: [player.id, Validators.required],
        name: [player.name, Validators.required],
        class: [player.class, Validators.required],
        level: [player.level, [Validators.required, Validators.min(1)]]
      }));
      this.campaignForm.setControl('player_characters', this.fb.array(playerCharactersFormGroups));

      // Charger les NPCs
      this.npcs = campaign.npcs || [];
    });
  }

  // Afficher ou masquer les NPCs
  toggleNPCs(): void {
    this.showNPCs = !this.showNPCs;
  }

  onSubmit(): void {
    if (this.campaignForm.valid) {
      if (this.isEditMode && this.currentCampaignId !== null) {
        this.campaignService.updateCampaign(this.currentCampaignId, this.campaignForm.value).subscribe(
          () => {
            this.router.navigate(['/campaign']);
          },
          error => {
            console.error('Error updating campaign:', error);
            alert('Error updating campaign.');
          }
        );
      } else {
        this.campaignService.addCampaign(this.campaignForm.value).subscribe(
          () => {
            this.router.navigate(['/campaign']);
          },
          error => {
            console.error('Error creating campaign:', error);
            alert('Error creating campaign.');
          }
        );
      }
    }
  }
}
