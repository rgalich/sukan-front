import { Component } from '@angular/core';
import { DrawerService } from './services/drawer/drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  isCollapsed = false;
  visible = false;

  constructor(private readonly drawerService: DrawerService) {
    this.drawerService.visible.subscribe(visible => this.visible = visible);
  }

  get width() {
    return window.innerWidth;
  }

  toogle() {
    this.drawerService.visible.next(!this.drawerService.visible.value);
  }
}
