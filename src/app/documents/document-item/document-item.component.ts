import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css'],
  standalone: true
})
export class DocumentItemComponent {
  @Input() document: any;  // Add @Input() decorator to accept document input
}
