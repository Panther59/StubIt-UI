import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
        {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
        },
        {
            path: 'dashboard',
            loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
        },
        {
            path: 'stubs',
            loadComponent: () => import('./features/stubs/stub-list/stub-list').then(m => m.StubListComponent)
        },
        {
            path: 'stubs/new',
            loadComponent: () => import('./features/stubs/stub-editor/stub-editor').then(m => m.StubEditorComponent)
        },
        {
            path: 'stubs/:id',
            loadComponent: () => import('./features/stubs/stub-editor/stub-editor').then(m => m.StubEditorComponent)
        },
        {
            path: 'settings',
            loadComponent: () => import('./features/settings/settings').then(m => m.SettingsComponent)
        },
        {
            path: 'logs',
            redirectTo: 'dashboard' // Placeholder
        }
    ]
  }
];
