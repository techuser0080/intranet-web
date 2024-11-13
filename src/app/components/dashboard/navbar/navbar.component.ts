import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { Menu } from '../../../interfaces/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, SharedModule, MatIconModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  menu: Menu[] = [];

  constructor(private _menuService: MenuService) {}

  loadMenu() {
    this._menuService.getMenu().subscribe(data => {
      console.log(data);
      this.menu = data;
    })
  }

  ngOnInit(): void {
    this.loadMenu();
  }


}
