// contact-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/contact.model';
import { ContactService } from '../contact.service';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  standalone: true, // Mark this component as standalone
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | undefined;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          return id ? this.contactService.getContact(id) : of(undefined);
        }),
        tap(contact => console.log('Fetched Contact:', contact))
      )
      .subscribe(contact => {
        this.contact = contact;
      });
  }

  onDelete() {
    if (this.contact) {
      console.log('Deleting Contact:', this.contact); // Debugging line
      this.contactService.deleteContact(this.contact);
      this.router.navigate(['/contacts']); // Using navigate with array format
    }
  }
}
