import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | undefined;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = params.get('id');
          console.log('Retrieved Route ID:', id); // Log the ID from the route
          return id ? this.contactService.getContact(id) : of(undefined);
        }),
        tap(contact => console.log('Fetched Contact:', contact)) // Log contact data for each retrieval
      )
      .subscribe(contact => {
        this.contact = contact;
        console.log('Updated Contact in Component:', this.contact); // Log final update
      });
  }
}
