import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CreatecampaignpageComponent } from './createcampaignpage/createcampaignpage.component';
import { DisplaycampaignsComponent } from './displaycampaigns/displaycampaigns.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { 
    path: 'campaign', 
    component: CampaignComponent,
    children: [
      { path: 'create', component: CreatecampaignpageComponent },
      { path: 'display', component: DisplaycampaignsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
