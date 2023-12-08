import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ModalService} from '../../services/modal.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  public form = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    email: new FormControl<string>('', [
      Validators.email,
      Validators.required,
      Validators.minLength(6)
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(private authService: AuthService, private modalService: ModalService) {
  }

  public get name(): FormControl {
    return this.form.controls.name as FormControl;
  }

  public get email(): FormControl {
    return this.form.controls.email as FormControl;
  }

  public get password(): FormControl {
    return this.form.controls.password as FormControl;
  }


  public submit(): void {
    this.authService.signUp(this.form.value.name, this.form.value.email, this.form.value.password).subscribe(() => {
      this.modalService.close();
    });
  }

}
