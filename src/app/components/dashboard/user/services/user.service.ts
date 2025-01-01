import { Injectable } from '@angular/core';
import { User } from '../../../../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userList: User[] = [
    {user: 'testuser@gmail.com', name: 'Test', lastName: 'User', age: '20', genre: 'Masculino' },
    {user: 'testuser2@gmail.com', name: 'Test2', lastName: 'User2', age: '21', genre: 'Masculino' },
    {user: 'testuser3@gmail.com', name: 'Test3', lastName: 'User3', age: '22', genre: 'Femenino' },
    {user: 'testuser4@gmail.com', name: 'Test4', lastName: 'User4', age: '24', genre: 'Masculino' },
    {user: 'testuser5@gmail.com', name: 'Test5', lastName: 'User5', age: '25', genre: 'Masculino' },
    {user: 'testuser6@gmail.com', name: 'Test6', lastName: 'User6', age: '26', genre: 'Masculino' },
    {user: 'testuser7@gmail.com', name: 'Test7', lastName: 'User7', age: '27', genre: 'Masculino' },
    {user: 'testuser8@gmail.com', name: 'Test8', lastName: 'User8', age: '28', genre: 'Masculino' },
    {user: 'testuser9@gmail.com', name: 'Test9', lastName: 'User9', age: '27', genre: 'Masculino' },
    {user: 'testuser10@gmail.com', name: 'Test10', lastName: 'User10', age: '26', genre: 'Masculino' },
    {user: 'testuser11@gmail.com', name: 'Test11', lastName: 'User11', age: '25', genre: 'Masculino' },
    {user: 'testuser12@gmail.com', name: 'Test12', lastName: 'User12', age: '24', genre: 'Masculino' },
    {user: 'testuser13@gmail.com', name: 'Test13', lastName: 'User13', age: '23', genre: 'Masculino' },
  ];

  constructor() { }

  getUsers() {
    return this.userList.slice();
  }

  deleteUser(index: number) {
    this.userList.splice(index, 1);
  }

  addUser(user: User) {
    this.userList.unshift(user);
  }
}
