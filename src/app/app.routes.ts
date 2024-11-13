import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent, pathMatch: 'full', canActivate: [AuthRedirectGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'listas', component: ListsComponent, canActivate: [AuthGuard] },
];
