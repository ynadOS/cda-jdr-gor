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

  constructor(
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private router: ActivatedRoute  // Injecter le Router

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
  }

  get player_characters(): FormArray {
    return this.campaignForm.get('player_characters') as FormArray;
  }

  createPlayerCharacter(): FormGroup {
    return this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      class: ['', Validators.required],
      level: [1, [Validators.required, Validators.min(1)]]
    });
  }

  // Ajouter un personnage à l'array
  addPlayerCharacter(): void {
    this.player_characters.push(this.createPlayerCharacter());
  }

  // Supprimer un personnage de l'array
  removePlayerCharacter(index: number): void {
    this.player_characters.removeAt(index);
  }

  // Modifier la campagne existante
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
    });
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.campaignForm.valid) {
      if (this.isEditMode) {
        // Si on est en mode édition, mettre à jour la campagne
        this.campaignService.updateCampaign(this.currentCampaignId!, this.campaignForm.value).subscribe(() => {
          console.log('Campagne mise à jour');
        });
      } else {
        // Sinon, créer une nouvelle campagne
        this.campaignService.addCampaign(this.campaignForm.value).subscribe(() => {
          console.log('Campagne créée');
        });
      }
    }
  }
}
