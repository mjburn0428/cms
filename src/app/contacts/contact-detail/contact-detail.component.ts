import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterModule], // Include RouterModule here
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
        })
      )
      .subscribe(contact => {
        this.contact = contact; // Update the current contact
      });
  }

  onDelete(): void {
    if (this.contact) {
      this.contactService.deleteContact(this.contact.id);
      this.router.navigate(['/contacts']);
    }
  }
}
