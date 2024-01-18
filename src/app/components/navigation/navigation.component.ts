import {Component, OnInit} from '@angular/core';
import {ModalService, ModalType} from '../../services/modal.service';
import {Store} from '@ngrx/store';
import {State} from '../../store';
import {selectUserId, selectUserName} from '../../store/selectors/selectors';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  public ModalType = ModalType;
  public userName: string;
  public userId: string;

  constructor(
    private store: Store<State>,
    public modalService: ModalService,
    private authService: AuthService
  ) {
  }

  public openModalLogin(): void {
    this.modalService.open(ModalType.login);
  }

  public openModalSignup(): void {
    this.modalService.open(ModalType.signUp);
  }

  public logout(): void {
    this.authService.logout();
  }

  public ngOnInit(): void {
    this.store.select(selectUserName).subscribe((userName: string) => {
      this.userName = userName;
    });
    this.store.select(selectUserId).subscribe((userId: string) => {
      this.userId = userId;
    });
  }



}
