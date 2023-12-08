import {Component, Input, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {Router} from '@angular/router';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent implements OnInit {
  @Input() public title: string;
  public loading = true;
  public postId: string;

  constructor(public postService: PostService,
              private router: Router,
              public modalService: ModalService
  ) {


  }

  public deletePost(): void {
    this.postService.delete(this.postId).subscribe(() => {
      this.loading = false;
      this.router.navigate(['/']);
      this.modalService.close();
    });
  }

  public ngOnInit(): void {
    this.postId = this.router.url.split('/').pop();


  }
}
