import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StubService, Stub } from '../../../core/services/stub.service';

@Component({
  selector: 'app-stub-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-slate-100">
        {{ isEditMode() ? 'Edit Stub' : 'Create New Stub' }}
      </h1>
      <div class="flex space-x-3">
        <a routerLink="/stubs" class="px-4 py-2 border border-slate-700 rounded-lg shadow-sm text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors">
          Cancel
        </a>
        <button (click)="savestub()" [disabled]="form.invalid || isSaving()" class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          @if (isSaving()) {
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          } @else {
            Save Stub
          }
        </button>
      </div>
    </div>

    <div class="bg-slate-900 rounded-xl border border-slate-800 p-6">
      <form [formGroup]="form" class="space-y-6">
        <!-- Basic Info -->
        <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label for="name" class="block text-sm font-medium text-slate-400">Name</label>
            <div class="mt-1">
              <input type="text" id="name" formControlName="name" class="block w-full bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5 placeholder-slate-500" placeholder="e.g. Payment Gateway Success">
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="statusCode" class="block text-sm font-medium text-slate-400">Status Code</label>
            <div class="mt-1">
               <input type="number" id="statusCode" formControlName="statusCode" class="block w-full bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5">
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="method" class="block text-sm font-medium text-slate-400">Method</label>
            <div class="mt-1">
              <select id="method" formControlName="method" class="block w-full bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="path" class="block text-sm font-medium text-slate-400">Path</label>
            <div class="mt-1">
              <input type="text" id="path" formControlName="path" class="block w-full bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2.5" placeholder="/api/v1/resource">
            </div>
          </div>
        </div>

        <div>
            <label for="body" class="block text-sm font-medium text-slate-400">Response Body (JSON)</label>
            <div class="mt-1">
                <textarea id="body" formControlName="body" rows="10" class="shadow-sm block w-full bg-slate-800 border border-slate-700 rounded-lg text-slate-200 font-mono text-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"></textarea>
            </div>
            <p class="mt-2 text-sm text-slate-500">Enter the JSON response body here.</p>
        </div>

      </form>
    </div>
  `,
  styles: []
})
export class StubEditorComponent {
  private fb = inject(FormBuilder);
  private stubService = inject(StubService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode = signal(false);
  isSaving = signal(false);
  stubId: string | null = null;

  form = this.fb.group({
    name: ['', Validators.required],
    method: ['GET', Validators.required],
    path: ['/', Validators.required],
    statusCode: [200, Validators.required],
    body: ['{}']
  });

  ngOnInit() {
    this.stubId = this.route.snapshot.paramMap.get('id');
    if (this.stubId) {
      this.isEditMode.set(true);
      // Load stub logic here if connected to API
      // this.stubService.getStub(this.stubId).subscribe(...)
    }
  }

  savestub() {
    if (this.form.invalid) return;

    this.isSaving.set(true);
    const formVal = this.form.value;

    const stubPayload: Stub = {
        id: this.stubId || undefined,
        name: formVal.name!,
        isEnabled: true,
        request: {
            method: formVal.method!,
            path: formVal.path!
        },
        response: {
            statusCode: formVal.statusCode!,
            body: formVal.body!
        }
    };

    const request$: Observable<any> = this.isEditMode() && this.stubId
        ? this.stubService.updateStub(this.stubId, stubPayload)
        : this.stubService.createStub(stubPayload);
    
    request$.subscribe({
        next: () => {
            this.isSaving.set(false);
            this.router.navigate(['/stubs']);
        },
        error: (err: any) => {
            console.error(err);
            this.isSaving.set(false);
            // Handle error toast here
        }
    });
  }
}
