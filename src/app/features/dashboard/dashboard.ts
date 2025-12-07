import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Stat Card 1 -->
      <div class="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-400">Total Stubs</p>
            <p class="text-2xl font-bold text-slate-100 mt-1">12</p>
          </div>
          <div class="p-3 bg-blue-500/10 rounded-lg text-blue-500">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
        </div>
      </div>
      
       <!-- Stat Card 2 -->
      <div class="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-400">Active Mocks</p>
            <p class="text-2xl font-bold text-green-400 mt-1">8</p>
          </div>
          <div class="p-3 bg-green-500/10 rounded-lg text-green-500">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
        </div>
      </div>

       <!-- Stat Card 3 -->
      <div class="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-400">Requests (24h)</p>
            <p class="text-2xl font-bold text-slate-100 mt-1">1,240</p>
          </div>
           <div class="p-3 bg-purple-500/10 rounded-lg text-purple-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          </div>
        </div>
      </div>
       <!-- Stat Card 4 -->
      <div class="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-400">Avg Latency</p>
            <p class="text-2xl font-bold text-slate-100 mt-1">45ms</p>
          </div>
           <div class="p-3 bg-orange-500/10 rounded-lg text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity Placeholder -->
    <div class="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-800">
            <h3 class="text-sm font-medium text-slate-200">Recent Activity</h3>
        </div>
        <div class="p-6 text-center text-slate-500">
            No recent activity captured.
        </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent {}
