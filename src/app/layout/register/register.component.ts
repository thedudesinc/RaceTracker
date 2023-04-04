import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    type: new FormControl(UserType.Driver, { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(private userService: UserService, private loadingService: LoadingService) { }

  onSubmit(): void {
    this.loadingService.isLoadingVisible.next(true);
    this.userService.create(this.userForm.getRawValue()).subscribe((response) => {
      this.loadingService.isLoadingVisible.next(false);;
    });
  }
}
