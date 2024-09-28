import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  standalone: true
})
export class ContactDetailComponent implements OnInit {
  contact: { 
    id: string;
    name: string;
    email: string;
    phone: string;
    imageUrl: string;
    group: any; 
  };

  constructor() {
     //Initialize the contact with dummy data for now
    this.contact = {
      id: '1',
      name: 'R. Kent Jackson',
      email: 'jacksonk@byui.edu',
      phone: '208-496-3771',
      imageUrl: '/assets/images/jacksonk.jpg',
      group: null
    };
  }

  ngOnInit(): void {
    // This will eventually fetch the real data
  }
}
