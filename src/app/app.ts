import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header-component/header-component';
import { SidebarComponent } from "./layout/sidebar-component/sidebar-component";
import { MainpageComponent } from "./layout/mainpage-component/mainpage-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, MainpageComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('GMail-clone');
}
