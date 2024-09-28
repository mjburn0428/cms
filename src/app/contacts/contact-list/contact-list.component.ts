import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  standalone: true,
  imports: [CommonModule]  // Import CommonModule to use *ngFor
})
export class ContactListComponent {
  contacts = [
    {
      id: '1',
      name: 'R. Kent Jackson',
      email: 'jacksonk@byui.edu',
      phone: '208-496-3771',
      imageUrl: '/assets/images/jacksonk.jpg',  // Correct path
      group: null
    },
    {
      id: '2',
      name: 'Rex Barzee',
      email: 'barzeer@byui.edu',
      phone: '208-496-3768',
      imageUrl: '/assets/images/barzeer.jpg',  // Correct path
      group: null
    }
  ];

  constructor() {}
}