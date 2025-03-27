import { Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '../../shared/shared.module';
import { User } from '../../../interfaces/usuario';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UserService } from './services/user.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatToolbarModule, SharedModule, MatTooltipModule, MatSortModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userList: any[] = [];
  
  displayedColumns: string[] = ['user', 'name', 'lastName', 'age', 'genre' , 'actions'];
  dataSource!: MatTableDataSource<any>;

  constructor (private _userService: UserService, private _snackBar: MatSnackBar, private router: Router) {}

  loadUsers() {
    console.log('entro')
    this._userService.getUsers().subscribe({
      next: (data: any) => {
        this.userList = data.data
        this.dataSource = new MatTableDataSource(this.userList);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  deleteUser(userId: number) {
    this._userService.deleteUser(userId).subscribe({
      next: (data: any) => {
        this.loadUsers();
        this._snackBar.open('El usuario fue eliminado con exito.', '', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      },
      error: (err) => {
        console.log(err)
      }
    })

  }
}
