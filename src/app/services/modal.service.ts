import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export enum ModalType {
  login,
  signUp,
  createPost,
  deletePost
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public isVisible$ = new BehaviorSubject<boolean>(false);
  public modalType$ = new BehaviorSubject(ModalType.login);


  public open(modalType: ModalType): void {
    this.modalType$.next(modalType);
    this.isVisible$.next(true);
  }

  public close(): void {
    this.isVisible$.next(false);
  }

  public checkModalType = (modalType: ModalType): boolean => this.modalType$.getValue() === modalType;


}
