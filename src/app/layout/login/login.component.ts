import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsOf } from 'src/app/helpers/helper.types';
import { LoginInput } from 'src/app/services/models/authentication.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup<ControlsOf<LoginInput>> = new FormGroup<ControlsOf<LoginInput>>({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  onSubmit(): void {
    this.authenticationService.post(this.loginForm.getRawValue()).subscribe((response) => {
      console.log(response);
      this.router.navigate(['/']);
    });

  }
}
