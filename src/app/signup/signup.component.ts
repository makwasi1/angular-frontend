import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
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
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      customerId: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(150)]]
    });
   }

  ngOnInit(): void {}

  async registerAsync(): Promise<void> {
    if (!this.form.valid) return;
    console.log(this.generatePin())
    const user = { ...this.form.value };
    const result = await this.authService.register(user.name,user.customerId,user.email,this.generatePin());
  
    if (!result) {
      alert("error");
    }

    console.log(result)

    if (result) {
      localStorage.setItem('customerId', user.customerId); //setting the userId in local storage
      this.router.navigate(['login']);
    } else {
      alert("error");
    }
  }

  //generate a randome 4 digit pin
  generatePin(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }


  togglePasswordVisibility(event: MouseEvent): void {
    event.stopPropagation();
    this.showPassword = !this.showPassword;
  }


}
