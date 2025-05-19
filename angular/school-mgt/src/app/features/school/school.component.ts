import { Component } from '@angular/core';

@Component({
  selector: 'app-school',
  standalone: false,
  template: `
  <app-navbar />
  <div class="content-container">
      <router-outlet></router-outlet>
  </div>
  `,
  styles: ``
})
export class SchoolComponent {

}
