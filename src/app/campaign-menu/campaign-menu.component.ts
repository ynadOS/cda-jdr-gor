// campaign-menu.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-campaign-menu',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './campaign-menu.component.html',
  styleUrls: ['./campaign-menu.component.css']
})
export class CampaignMenuComponent {

}
