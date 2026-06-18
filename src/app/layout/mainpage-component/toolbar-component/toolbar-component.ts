import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: 'app-toolbar-component',
  imports: [MatIcon, MatTooltipModule],
  templateUrl: './toolbar-component.html',
  styleUrls: ['./toolbar-component.scss'],
})
export class ToolbarComponent {}
