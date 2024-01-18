import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../models/post';
import {environment} from '../../../environments/environment';
import {Store} from '@ngrx/store';
import {State} from '../../store';
import {selectUserName} from '../../store/selectors/selectors';
import {BehaviorSubject} from 'rxjs';
import {ModalService, ModalType} from '../../services/modal.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  @Input() public post: Post;
  @Input() public control = false;
  public loading = true;
  public baseUrl: string = environment.apiUrl;
  public isOwner$ = new BehaviorSubject<boolean>(false);
  public isEditing = false;
  public editedTitle = '';

  constructor(
    public modalService: ModalService,
    private store: Store<State>
  ) {
  }

  public startEditing(): void {
    this.isEditing = true;
    this.editedTitle = this.post.title; // сохраняем текущий заголовок
  }

  public stopEditing(): void {
    this.isEditing = false;
  }

  public openModal(): void {
    this.modalService.open(ModalType.deletePost);
  }

  public ngOnInit(): void {
    this.store.select(selectUserName).subscribe((userName: string) => {
      this.isOwner$.next(userName === this.post.authorName);
    });
  }
}
