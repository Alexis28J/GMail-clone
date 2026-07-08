import { Routes } from '@angular/router';
import { MainpageComponent } from './layout/mainpage-component/mainpage-component';
import { authGuard } from './guard/auth-guard';
import { MainLayoutComponent } from './layout/main-layout-component/main-layout-component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./auth/login-component/login-component')
                .then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./auth/register-component/register-component')
                .then(m => m.RegisterComponent)
    },
    {
        path: 'app',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: MainpageComponent
            }
        ]
    }


];


