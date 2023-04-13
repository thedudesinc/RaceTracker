import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ControlsOf } from 'src/app/helpers/helper.types';
import { LoadingService } from 'src/app/services/loading.service';
import { UserInput } from 'src/app/services/models/user.model';
import { UserType } from 'src/app/services/types/user.types';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  userForm: FormGroup<ControlsOf<UserInput>> = new FormGroup<ControlsOf<UserInput>>({
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2), Validators.maxLength(20)] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email], asyncValidators: [EmailValidator.createValidator(this.userService)] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6), Validators.maxLength(100)] }),
    type: new FormControl(UserType.Driver, { nonNullable: true, validators: [Validators.required] }),
  });

  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get phone() { return this.userForm.get('phone'); }
  get email() { return this.userForm.get('email'); }
  get password() { return this.userForm.get('password'); }

  constructor(private userService: UserService, private loadingService: LoadingService, private router: Router) { }

  onSubmit(): void {
    this.loadingService.isLoadingVisible.next(true);
    this.userService.create(this.userForm.getRawValue()).subscribe((response) => {
      this.loadingService.isLoadingVisible.next(false);
      this.router.navigate(['/login']);
    });
  }
}

export class EmailValidator {
  static createValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return userService
        .verifyEmail(control.value)
        .pipe(
          map((result: boolean) =>
            result ? null : { emailAlreadyExists: true }
          )
        );
    };
  }
}
