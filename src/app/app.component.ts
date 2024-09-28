import { Component } from '@angular/core';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [HeaderComponent, ContactsComponent, RouterModule]
})
export class AppComponent { }