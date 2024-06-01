import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../functionality/services/user.service';
import { User } from '../../functionality/types/user';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: `./login.component.css`,
})
export class LoginComponent {
  userService = inject(UserService);

  constructor(private router: Router){}
  
    user: User = {
      username: '',
      password: '',
      email: '',
      userID: 0,
      loginToken: ''
    };

  selected: string = '';

  formNewUser = new FormGroup({
    emailField: new FormControl<string>('', [
      Validators.email,
    ]),
    passwordField: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    usernameField: new FormControl<string>('', Validators.required),
    loginRadio: new FormControl<boolean | null>(null),
    registerRadio: new FormControl<boolean | null>(null),
  });

  public get emailField() {
    return this.formNewUser.get('emailField');
  }
  public get passwordField() {
    return this.formNewUser.get('passwordField');
  }
  public get usernameField() {
    return this.formNewUser.get('usernameField');
  }

  ngOnInit() {
    if (localStorage.getItem('Token') !== null) {
      document.location.href='/'
    }
  }

  selectedRadioIs(a: any) {
    this.selected = a.value
  }

  registerUser(
    email: string | null | undefined,
    username: string | null | undefined,
    password: string | null | undefined,
    event: Event
  ) {
    event.preventDefault();

    this.user.email = email;
    this.user.username = username;
    this.user.password = password;

    this.userService.registerUser(this.user).subscribe((response) => {      
      localStorage.setItem('Token', <string>response.loginToken)
      localStorage.setItem('Username', <string>response.username)
      localStorage.setItem('User ID', <string><unknown>response.userID)     
      document.location.href = '/'
    });
  }

  fetchUser( username: string | null | undefined, password: string | null | undefined, event: Event) {
    event.preventDefault();

    this.userService.fetchUser(username ? username:'', password ? password : '' ).subscribe((response) => {
      localStorage.setItem('Token', <string>response.loginToken)
      localStorage.setItem('Username', <string>response.username)
      localStorage.setItem('User ID', <string><unknown>response.userID)
      document.location.href = '/'
    });
  }
}
