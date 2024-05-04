import { Component } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Ripple, Input, initTWE } from "tw-elements";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './Home.component.html',
  styleUrl: './Home.component.css',
})
export class HomeComponent {
  ngOnInit(): void {
    initTWE({Ripple, Input})
  }
}
