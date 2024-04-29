import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './addCard.component.html',
  styleUrl: './addCard.component.css',
})
export class AddCardComponent { }
