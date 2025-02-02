import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CreatecampaignpageComponent } from './createcampaignpage/createcampaignpage.component';
import { DisplaycampaignsComponent } from './displaycampaigns/displaycampaigns.component';
import { NpcComponent } from './npc/npc.component';
import { DisplayNpcsComponent } from './displaynpcs/displaynpcs.component';
import { NpcFormComponent } from './npc-form/npc-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'campaign/create', component: CreatecampaignpageComponent },
  { path: 'npc', component: NpcComponent,

  },
  { path: 'npc/create', component: NpcFormComponent },
  { 
    path: 'campaign', component: CampaignComponent,
    children: [
      { path: '', component: DisplaycampaignsComponent }, // Affiche toutes les campagnes sur la page Campagnes
      { path: 'create', component: CreatecampaignpageComponent },
      { path: 'display', component: DisplaycampaignsComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
