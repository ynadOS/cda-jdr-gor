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
    private route: ActivatedRoute, // Injecter le Router
    private router: Router // Router à utiliser pour la navigation après la soumission
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
    this.route.params.subscribe(params => {
      const id = params['id']; // Assurez-vous que l'ID de la campagne est fourni par la route
      if (id) {
        this.isEditMode = true;
        this.currentCampaignId = id;
        this.loadCampaignData(id); // Chargez les données existantes de la campagne
      } else {
        this.isEditMode = false; // Si aucun ID, passez en mode création
      }
    });
    
  
  }

  get player_characters(): FormArray {
    return this.campaignForm.get('player_characters') as FormArray;
  }

  createPlayerCharacter(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required], // Le nom est obligatoire
      class: ['', Validators.required], // La classe est obligatoire
      level: [1, [Validators.required, Validators.min(1)]] // Niveau minimum 1
    });
  }

  // createPlayerCharacter(): FormGroup {
  //   return this.fb.group({
  //     id: [1, Validators.required],              // Valeur par défaut valide
  //     name: ['Default Name', Validators.required], // Nom par défaut
  //     class: ['Warrior', Validators.required],    // Classe par défaut
  //     level: [1, [Validators.required, Validators.min(1)]] // Niveau minimum valide
  //   });
  // }
  
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
      this.campaignForm.setValue({
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
    console.log('Form submitted');  // Log pour vérifier si la soumission est appelée
    console.log(this.campaignForm.valid);  // Vérifie si le formulaire est valide
    
    if (this.campaignForm.valid) {
      console.log('Form data:', this.campaignForm.value);  // Log des données envoyées
      if (this.isEditMode && this.currentCampaignId !== null) {
        // Mise à jour d'une campagne existante
        this.campaignService.updateCampaign(this.currentCampaignId, this.campaignForm.value).subscribe(
          () => {
            console.log('Campagne mise à jour avec succès');
            this.router.navigate(['/campaign']);  // Redirection vers la liste des campagnes après mise à jour
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la campagne:', error);
            alert('Erreur lors de la mise à jour de la campagne.');
          }
        );
      } else {
        // Création d'une nouvelle campagne
        this.campaignService.addCampaign(this.campaignForm.value).subscribe(
          () => {
            console.log('Campagne créée avec succès');
            this.router.navigate(['/campaign']);  // Redirection vers la liste des campagnes après création
          },
          (error) => {
            console.error('Erreur lors de la création de la campagne:', error);
            alert('Erreur lors de la création de la campagne.');
          }
        );
      }
    } else {
      console.log('Form invalid');
    }
  }
    
  
}
