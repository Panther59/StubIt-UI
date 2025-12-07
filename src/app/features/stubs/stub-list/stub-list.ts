import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StubService } from '../../../core/services/stub.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-stub-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-slate-100">Stubs</h1>
      <a routerLink="/stubs/new" class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
        Create Stub
      </a>
    </div>

    <div class="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-800">
          <thead class="bg-slate-900/50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Method</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Path</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            @for (stub of stubs(); track stub.id) {
            <tr class="hover:bg-slate-800/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      [ngClass]="{
                        'bg-green-500/10 text-green-400': stub.request.method === 'GET',
                        'bg-blue-500/10 text-blue-400': stub.request.method === 'POST',
                        'bg-yellow-500/10 text-yellow-400': stub.request.method === 'PUT',
                        'bg-red-500/10 text-red-400': stub.request.method === 'DELETE',
                        'bg-purple-500/10 text-purple-400': stub.request.method === 'PATCH'
                      }">
                  {{ stub.request.method }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-200">
                {{ stub.request.path }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                <div class="flex items-center">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {{ stub.response.statusCode }}
                    </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                <a [routerLink]="['/stubs', stub.id]" class="text-blue-400 hover:text-blue-300 font-medium mr-3">Edit</a>
                <button class="text-red-400 hover:text-red-300 font-medium">Delete</button>
              </td>
            </tr>
            } @empty {
                <tr>
                    <td colspan="4" class="px-6 py-12 text-center text-slate-500">
                        No stubs found. Create one to get started.
                    </td>
                </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class StubListComponent {
  private stubService = inject(StubService);
  stubs = toSignal(this.stubService.getStubs(), { initialValue: [] });
}
