import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms'; // Import FormsModule here
import { Document } from '../models/document.model';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [FormsModule], // Add FormsModule to imports array
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent {
  originalDocument: Document | null = null;
  document: Document = { id: 0, name: '', description: '', url: '' };
  editMode: boolean = false;

  constructor(private router: Router) {}

  onCancel() {
    this.router.navigate(['/documents']); // Adjust this route as necessary
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    // Add form submission logic here
  }
}
