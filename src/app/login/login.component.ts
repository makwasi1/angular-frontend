import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  showPassword = false;
  public showSpinner: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      password: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
    });
   }

  ngOnInit(): void {}

   async loginAsync(): Promise<void> {
    if (!this.form.valid) return;

    const user = { ...this.form.value };
    const result  =  await this.authService.handlePromises(this.authService.login(user.email, user.password));
    // const tokenString = result && result[0].token

    if (!result) {
      alert("error");
    }

    localStorage.setItem('token', result[0].token);
    

    if (result) {
      this.router.navigate(['home']);
    } else {
      alert("error");
    }
  }

  togglePasswordVisibility(event: MouseEvent): void {
    event.stopPropagation();
    this.showPassword = !this.showPassword;
  }

}
