import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CampaignService } from '../services/campaign.service';
import { NpcService } from '../services/npc.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-npc-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './npc-form.component.html',
  styleUrls: ['./npc-form.component.css']
})
export class NpcFormComponent implements OnInit {
  npcForm!: FormGroup;
  campaigns: any[] = []; // Liste des campagnes disponibles
  isEditMode = false; // Mode modification ou création

  constructor(private fb: FormBuilder, private campaignService: CampaignService, private npcService: NpcService) {}

  ngOnInit(): void {
      this.npcForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        type: ['principal', Validators.required], // Valeur par défaut
        location: ['', Validators.required],
        campaignId: ['', Validators.required],
        quests: this.fb.array([]), // Tableau dynamique pour les quêtes
        objectives: this.fb.array([]), // Tableau dynamique pour les objectifs
    });

    this.loadCampaigns();
  }

  loadCampaigns() {
    this.campaignService.getCampaigns().subscribe(data => {
      this.campaigns = data;
    });
  }

  get quests(): FormArray {
    return this.npcForm.get('quests') as FormArray;
  }

  get objectives(): FormArray {
    return this.npcForm.get('objectives') as FormArray;
  }

  addQuest() {
    this.quests.push(this.fb.control('', Validators.required));
  }

  removeQuest(index: number) {
    this.quests.removeAt(index);
  }

  addObjective() {
    this.objectives.push(this.fb.control('', Validators.required));
  }

  removeObjective(index: number) {
    this.objectives.removeAt(index);
  }

  onSubmit() {
    if (this.npcForm.invalid) return;
  
    if (this.isEditMode) {
      this.npcService.updateNpc(this.npcForm.value).subscribe(response => {
        console.log('NPC mis à jour !', response);
      });
    } else {
      this.npcService.createNpc(this.npcForm.value).subscribe(response => {
        console.log('NPC créé !', response);
      });
    }
  }
  
}
