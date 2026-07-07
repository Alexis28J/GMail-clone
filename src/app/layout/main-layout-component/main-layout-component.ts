import { Component } from '@angular/core';
import { HeaderComponent } from "../header-component/header-component";
import { SidebarComponent } from "../sidebar-component/sidebar-component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main-layout-component',
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  //templateUrl: './main-layout-component.html',

  template: `
  <app-header-component></app-header-component>

    <div class="layout-container">
      <app-sidebar-component></app-sidebar-component>

      <div class="main-container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,

  styleUrls: ['./main-layout-component.scss'],
})


export class MainLayoutComponent { }






