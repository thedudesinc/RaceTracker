import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlsOf } from 'src/app/helpers/helper.types';
import { LoginInput } from 'src/app/services/models/authentication.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

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

  showLoginError = false;

  constructor(private authenticationService: AuthenticationService, private router: Router, private loadingService: LoadingService) { }

  onSubmit(): void {
    this.loadingService.isLoadingVisible.next(true);
    this.authenticationService.login(this.loginForm.getRawValue()).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigate(['/']).then(() => this.loadingService.isLoadingVisible.next(false));
      } else {
        this.showLoginError = true;
        this.loadingService.isLoadingVisible.next(false);
      }
    });
  }
}
