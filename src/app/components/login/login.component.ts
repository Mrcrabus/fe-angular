import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../services/modal.service';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public form = new FormGroup({
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


  public get email(): FormControl {
    return this.form.controls.email as FormControl;
  }

  public get password(): FormControl {
    return this.form.controls.password as FormControl;
  }

  public submit(): void {
    this.authService.login(this.form.value.email, this.form.value.password).subscribe(() => {
        this.modalService.close();
      }
    );
  }


}
