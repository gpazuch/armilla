import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(8)])
    ],
  });


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) {

  }

  onSubmit(): void {
    this.auth.login(this.loginForm.value);
  }
}
