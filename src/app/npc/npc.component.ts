import { Component } from '@angular/core';
import { NpcFormComponent } from '../npc-form/npc-form.component';
import { DisplayNpcsComponent } from '../displaynpcs/displaynpcs.component';

@Component({
  selector: 'app-npc',
  imports: [NpcFormComponent, DisplayNpcsComponent],
  templateUrl: './npc.component.html',
  styleUrl: './npc.component.css'
})
export class NpcComponent {

}
