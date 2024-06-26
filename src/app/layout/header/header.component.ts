import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  constructor(private router: Router) {}

    creds: string | null = null

    ngOnInit() {
      this.creds = localStorage.getItem('Token')
    }

    logout() {
      localStorage.clear()
      sessionStorage.clear()
      window.location.reload()
    }

}
