import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="text-2xl font-bold text-slate-100 mb-6">Settings</h1>

    <div class="bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-8">
      
      <!-- Proxy Settings -->
      <div>
        <h2 class="text-lg font-medium text-slate-200 mb-4">Proxy Configuration</h2>
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-slate-300">Global Fallback</p>
            <p class="text-sm text-slate-500">Forward requests to live backend when no stub matches.</p>
          </div>
          <button (click)="toggleFallback()" 
            [class.bg-blue-600]="fallbackEnabled()" 
            [class.bg-slate-700]="!fallbackEnabled()"
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <span [class.translate-x-5]="fallbackEnabled()" [class.translate-x-0]="!fallbackEnabled()"
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
          </button>
        </div>
      </div>

      <div class="border-t border-slate-800 pt-6">
        <h2 class="text-lg font-medium text-slate-200 mb-4">Target API</h2>
        <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6">
            <div class="sm:col-span-4">
                <label for="targetUrl" class="block text-sm font-medium text-slate-400">Target URL</label>
                <div class="mt-1 flex rounded-md shadow-sm">
                    <input type="text" id="targetUrl" class="block w-full min-w-0 flex-1 rounded-none rounded-l-md bg-slate-800 border-slate-700 text-slate-200 sm:text-sm p-2.5 focus:ring-blue-500 focus:border-blue-500" value="https://api.example.com">
                    <button class="inline-flex items-center rounded-r-md border border-l-0 border-slate-700 bg-slate-800 px-3 text-sm text-slate-400 hover:bg-slate-700">Save</button>
                </div>
            </div>
        </div>
      </div>

    </div>
  `,
  styles: []
})
export class SettingsComponent {
  fallbackEnabled = signal(true);

  toggleFallback() {
    this.fallbackEnabled.update(v => !v);
    // Call API to save setting
  }
}
