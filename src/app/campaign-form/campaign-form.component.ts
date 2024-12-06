import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.campaignForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      universe: ['', Validators.required],
      context: ['', Validators.required],
      progressStatus: ['', Validators.required],
      playerCharacters: this.fb.array([this.createPlayerCharacter()]) // Array dynamique
    });
  } 

  // Getter pour obtenir l'array de personnages
  get playerCharacters(): FormArray {
    return this.campaignForm.get('playerCharacters') as FormArray;
  }

  // Méthode pour créer un formulaire vide pour un personnage
  createPlayerCharacter(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      class: ['', Validators.required],
      level: [1, [Validators.required, Validators.min(1)]]
    });
  }

  // Ajouter un personnage à l'array
  addPlayerCharacter(): void {
    this.playerCharacters.push(this.createPlayerCharacter());
  }

  // Supprimer un personnage de l'array
  removePlayerCharacter(index: number): void {
    this.playerCharacters.removeAt(index);
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.campaignForm.valid) {
      console.log(this.campaignForm.value);
      console.log(("bien ajoutée"))
      // Logique pour envoyer les données au service ou à l'API
    }
  }
}
