import { User } from './../functionality/types/user';
import { UserService } from '../functionality/services/user.service';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../layout/header/header.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './Home.component.html',
  styleUrl: './Home.component.css',
})
export class HomeComponent {
  userService = inject(UserService)
  user: User = {
    username: '',
    password: '',
    email: '',
    userID: 0
  }

  formNewUser = new FormGroup({
    emailField: new FormControl<string>('', [Validators.email, Validators.required]),
    passwordField: new FormControl<string>('', Validators.required),
    usernameField: new FormControl<string>('', [Validators.required, Validators.minLength(8)])
  }) 


public get emailField() {
  return this.formNewUser.get('emailField')
}
public get passwordField() {
  return this.formNewUser.get('passwordField')
}
public get usernameField() {
  return this.formNewUser.get('usernameField')
}


  onSubmit(email: string |null|undefined, username: string|null|undefined, password:string|null|undefined, event: Event) {
    event.preventDefault();

    this.user.email = email
    this.user.username = username
    this.user.password = password 
    
    this.userService.registerUser(this.user).subscribe((response) => {
      console.log(">>>>>>>>>>>", response);
      
    })
  }

}
