import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {ModalService, ModalType} from '../../services/modal.service';
import {Store} from '@ngrx/store';
import {State} from '../../store';
import {selectUserName} from '../../store/selectors/selectors';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html'
})
export class PostsPageComponent implements OnInit {
  public title = 'angular app';
  public loading = true;
  public term = '';
  public userName: string;

  constructor(
    public postService: PostService,
    public modalService: ModalService,
    private store: Store<State>
  ) {
  }

  public openModal(): void {
    this.modalService.open(ModalType.createPost);
  }


  public ngOnInit(): void {
    this.store.select(selectUserName).subscribe((userName: string) => {
      this.userName = userName;
    });

    this.postService.getAll().subscribe(() => {
      this.loading = false;
    });

  }

}
