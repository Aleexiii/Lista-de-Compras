import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
  
export class LoginComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public auth: AuthService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Código que acessa o objeto window ou depende do Auth0
      this.auth.isAuthenticated$.subscribe(isAuthenticated => {
        console.log('User is authenticated:', isAuthenticated);
      });
    }
  }
}
