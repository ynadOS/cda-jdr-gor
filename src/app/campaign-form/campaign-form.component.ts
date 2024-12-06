import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CampaignService } from '../services/campaign.service';
@Component({
  selector: 'app-campaign-form',
  standalone: true, // Indique que ce composant est autonome
  imports: [ReactiveFormsModule, CommonModule], // Importer les modules nécessaires
  templateUrl: './campaign-form.component.html', // Fichier HTML
  styleUrls: ['./campaign-form.component.css'] // Fichier CSS
})
export class CampaignFormComponent implements OnInit {
  // Déclaration du formulaire principal
  campaignForm!: FormGroup; 
  isEditMode = false; // Définit si on est en mode édition ou création
  currentCampaignId: number | null = null; // Stocke l'ID de la campagne en cours d'édition
  
  constructor(
    private fb: FormBuilder,
    private campaignService: CampaignService,
    
  ) {}
  
  ngOnInit(): void {
    // Initialisation du formulaire
    this.campaignForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      universe: ['', Validators.required],
      context: ['', Validators.required],
      progress_status: ['', Validators.required],
      player_characters: this.fb.array([this.createPlayerCharacter()]) // Array dynamique
    });
  } 
  
  // Getter pour obtenir l'array de personnages
  get player_characters(): FormArray {
    return this.campaignForm.get('player_characters') as FormArray;
  }
  // Méthode pour créer un formulaire vide pour un personnage
  private characterIdCounter = 1
  createPlayerCharacter(): FormGroup {
    return this.fb.group({
      id: [this.characterIdCounter++, Validators.required], // Générer un ID unique
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

  

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.campaignForm.valid) {
      this.campaignService.addCampaign(this.campaignForm.value).subscribe(() => {
        console.log('Campagne créée avec succès');
        this.resetForm();
      });
    }
  }

  // Soumettre pour mettre à jour une campagne existante
  onUpdate(): void {
    if (this.campaignForm.valid && this.currentCampaignId !== null) {
      this.campaignService
        .updateCampaign(this.currentCampaignId, this.campaignForm.value)
        .subscribe(() => {
          console.log('Campagne mise à jour avec succès');
          this.resetForm();
        });
    }
  }

  // Charger une campagne existante
  loadExistingCampaign(id: number): void {
    this.campaignService.getCampaignById(id).subscribe((campaign) => {
      this.isEditMode = true;
      this.currentCampaignId = id;
      this.campaignForm.patchValue({
        name: campaign.name,
        description: campaign.description,
        universe: campaign.universe,
        context: campaign.context,
        progress_status: campaign.progress_status
      });

      // Charger les personnages
      this.player_characters.clear();
      campaign.player_characters.forEach((character: any) => {
        this.player_characters.push(this.fb.group({
          id: [character.id, Validators.required],
          name: [character.name, Validators.required],
          class: [character.class, Validators.required],
          level: [character.level, [Validators.required, Validators.min(1)]]
        }));
      });
    });
  }

  // Réinitialiser le formulaire pour revenir en mode création
  resetForm(): void {
    this.isEditMode = false;
    this.currentCampaignId = null;
    this.campaignForm.reset({
      name: '',
      description: '',
      universe: '',
      context: '',
      progress_status: '',
      player_characters: []
    });
    this.player_characters.push(this.createPlayerCharacter());
  }

  
}
