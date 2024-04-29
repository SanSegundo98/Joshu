import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './Home.component.html',
  styleUrl: './Home.component.css',
})
export class HomeComponent {}
