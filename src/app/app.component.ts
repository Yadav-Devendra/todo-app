import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showForm: boolean = false;  // Initialize showForm to control visibility of the form

  toggleForm(): void {
    this.showForm = !this.showForm;  // Toggle the visibility of the form
  }
}
