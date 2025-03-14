import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private currentUserLoginOn = new BehaviorSubject<boolean>(
    typeof localStorage !== 'undefined' && !!localStorage.getItem('user')
  );
  private currentUserData = new BehaviorSubject<User | null>(
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || 'null')
      : null
  );

  constructor(private router: Router) {}

  login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch('./assets/data.json')
          .then((res) => res.json())
          .then((users: User[]) => {
            const user = users.find(
              (u) => u.email === email && u.password === password
            );
            if (user) {
              if (typeof localStorage !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(user));
              }
              this.currentUserData.next(user);
              this.currentUserLoginOn.next(true);
              resolve(user);
            } else {
              reject(new Error('Correo o contraseña incorrectos.'));
            }
          })
          .catch(() => reject(new Error('Error al cargar los datos.')));
      }, 1000);
    });
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');
    }
    this.currentUserData.next(null);
    this.currentUserLoginOn.next(false);
    this.router.navigate(['/login']);
  }

  get userData() {
    return this.currentUserData.asObservable();
  }

  get userLoginOn() {
    return this.currentUserLoginOn.asObservable();
  }
}
