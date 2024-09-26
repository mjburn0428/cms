import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Ensure this component is standalone
  imports: [HeaderComponent, RouterModule],  // Add RouterModule to imports
})
export class AppComponent {
  title = 'cms';
}