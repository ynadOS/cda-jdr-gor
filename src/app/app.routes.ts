import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CreatecampaignpageComponent } from './createcampaignpage/createcampaignpage.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'campaign', component: CampaignComponent }
];

export const routesCampaign: Routes = [
  { path: 'campaign/create', component: CreatecampaignpageComponent }
];  

@NgModule({
  imports: [
    RouterModule.forRoot(routes),           // Importation des routes principales
    RouterModule.forChild(routesCampaign)  // Importation des routes supplémentaires pour la création de campagne
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

