import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { User } from '../../../interfaces/usuario';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatToolbarModule, SharedModule, MatTooltipModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userList: User[] = [
    {user: 'testuser@gmail.com', name: 'Test', lastName: 'User', age: '20'},
    {user: 'testuser2@gmail.com', name: 'Test2', lastName: 'User2', age: '21'},
    {user: 'testuser3@gmail.com', name: 'Test3', lastName: 'User3', age: '22'},
    {user: 'testuser4@gmail.com', name: 'Test4', lastName: 'User4', age: '24'},
  ];
  
  displayedColumns: string[] = ['user', 'name', 'lastName', 'age', 'actions'];
  dataSource = new MatTableDataSource(this.userList);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
