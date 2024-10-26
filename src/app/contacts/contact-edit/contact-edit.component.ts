import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contactId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');
  }

  onSave(): void {
    // Logic for saving the contact (can be expanded with form logic)
    console.log('Contact saved!');
    this.router.navigate(['/contacts']);
  }

  onCancel(): void {
    // Redirect back to the contact list
    this.router.navigate(['/contacts']);
  }
}
