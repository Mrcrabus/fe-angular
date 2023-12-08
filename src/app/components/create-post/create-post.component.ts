import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html'
})
export class CreatePostComponent {
  public form: FormGroup<{ title: FormControl, description: FormControl }> = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6)
    ]),

  });

  constructor(private postService: PostService, private modalService: ModalService) {
  }


  public get title(): FormControl {
    return this.form.controls.title as FormControl;
  }

  public get description(): FormControl {
    return this.form.controls.description as FormControl;
  }

  public submit(): void {
    this.postService.create(this.form.value.title, this.form.value.description).subscribe((): void => {
      this.modalService.close();
    });
  }

}
