import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip"; 

@Component({
  selector: 'app-header-component',
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.scss'],
})
export class HeaderComponent {}




