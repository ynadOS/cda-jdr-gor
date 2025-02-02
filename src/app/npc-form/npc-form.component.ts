import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CampaignService } from '../services/campaign.service';
import { NpcService } from '../services/npc.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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
  npcId: string | null = null;


  constructor(
    private fb: FormBuilder, 
    private campaignService: CampaignService, 
    private route: ActivatedRoute, 
    private npcService: NpcService,
    private router: Router
  ) {}

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

    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.npcId = id;
        this.loadNpc(id);
      }
    });
  }

  loadCampaigns() {
    this.campaignService.getCampaigns().subscribe(data => {
      this.campaigns = data;
    });
  }

    loadNpc(npcId: string): void {
    this.npcService.getNpcById(npcId).subscribe(npc => {
      this.npcForm.patchValue(npc);
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
  
    const npcData = this.npcForm.value;
    
    if (this.isEditMode && this.npcId) {
      // Ajoute l'ID à npcData avant d'envoyer la requête
      npcData.id = this.npcId; 
  
      this.npcService.updateNpc(npcData).subscribe(response => {
        console.log('NPC mis à jour !', response);
        this.router.navigate(['/npc']); // Redirection après mise à jour si nécessaire
      });
    } else {
      this.npcService.createNpc(npcData).subscribe(response => {
        console.log('NPC créé !', response);
        this.router.navigate(['/npc']); // Redirection après création si nécessaire
      });
    }
  }
  
}
