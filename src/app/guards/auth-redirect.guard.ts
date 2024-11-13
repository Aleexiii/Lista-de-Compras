import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService, AuthGuard } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthRedirectGuard implements CanActivate { 
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/listas']);
          return false
        } else {
          this.router.navigate(['/login']);
          return true;
        }
      })
    );
  }
}
