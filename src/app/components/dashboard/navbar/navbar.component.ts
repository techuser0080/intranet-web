import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Menu } from '../../../interfaces/menu';
import { MenuService } from './services/menu.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, SharedModule, MatIconModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];

  constructor(private _menuService: MenuService, private _cookieService: CookieService) {}

  loadMenu() {
    const rol = this._cookieService.get('rol')
    const route = (rol == 'Administrador') ? './assets/menu.json' : './assets/menu-operator.json'
    this._menuService.getMenu(route).subscribe(data => {
      this.menu = data;
    })
  }

  ngOnInit(): void {
    this.loadMenu();
  }


}
