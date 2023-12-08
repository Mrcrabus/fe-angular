import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
})
export class UserPageComponent implements OnInit {
  public loading = true;
  public user: User;
  private readonly userId: string;


  constructor(
    public postService: PostService,
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.userId = this.activateRoute.snapshot.params['id'];
  }

  public ngOnInit(): void {
    this.postService.getPostByIdUser(this.userId).subscribe(() => {
    });

    this.userService.getById(this.userId).subscribe((user: User) => {
        this.loading = false;
        this.user = user;
      }, () => {
      this.router.navigate(['/error/not-found']);
      }
    );
  }
}
