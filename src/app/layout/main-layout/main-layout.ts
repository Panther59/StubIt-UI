import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="flex h-screen bg-slate-950 text-slate-200">
      <!-- Sidebar -->
      <aside class="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0">
        <div class="h-16 flex items-center px-6 border-b border-slate-800">
          <span class="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">StubIt</span>
        </div>
        <nav class="p-4 space-y-1">
          <a routerLink="/dashboard" routerLinkActive="bg-slate-800 text-white" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            Dashboard
          </a>
          <a routerLink="/stubs" routerLinkActive="bg-slate-800 text-white" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            Stubs
          </a>
          <a routerLink="/logs" routerLinkActive="bg-slate-800 text-white" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            Live Logs
          </a>
          <a routerLink="/settings" routerLinkActive="bg-slate-800 text-white" class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            Settings
          </a>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <header class="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
          <h2 class="text-lg font-semibold text-slate-100">Dashboard</h2> <!-- Dynamic title later -->
          <div class="flex items-center space-x-4">
             <div class="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs">U</div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="flex-1 overflow-auto p-6">
           <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: []
})
export class MainLayoutComponent {}
