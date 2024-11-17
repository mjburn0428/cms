import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Document } from '../models/document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [FormsModule, CommonModule], // Add FormsModule and CommonModule
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document | null = null;
  document: Document = { id: 0, name: '', description: '', url: '' };
  editMode = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }

      this.originalDocument = this.documentService.getDocument(id) || null;
      if (!this.originalDocument) {
        return;
      }
      this.editMode = true;
      this.document = { ...this.originalDocument }; // Clone the document
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      console.error('Form is invalid:', form.value);
      return;
    }

    const { name, description, url } = form.value;
    const newDocument: Document = { ...this.document, name, description, url };

    if (this.editMode && this.originalDocument) {
      console.log('Updating document:', newDocument);
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      console.log('Adding new document:', newDocument);
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
