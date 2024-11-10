import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms'; // Import FormsModule
import { Document } from '../models/document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  standalone: true,
  imports: [FormsModule], // Add FormsModule here
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document | null = null;
  document: Document = { id: 0, name: '', description: '', url: '' };
  editMode: boolean = false;

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
      this.document = JSON.parse(JSON.stringify(this.originalDocument)); // Clone the document
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(
      this.document.id,
      value.name,
      value.description,
      value.url
    );

    if (this.editMode && this.originalDocument) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}

