import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { DisplaycampaignsComponent } from './displaycampaigns/displaycampaigns.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, DisplaycampaignsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cda-jdr';
}

