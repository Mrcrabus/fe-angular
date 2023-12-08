import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Post} from '../../models/post';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html'
})
export class PostPageComponent implements OnInit {
  public loading = true;
  public postId: string;
  public post: Post;

  constructor(
    public postService: PostService,
    private activateRoute: ActivatedRoute,
  ) {

  }

  public ngOnInit(): void {
    this.activateRoute.params.subscribe((params: Params) => this.postId = params['id']);

    this.postService.getPostById(this.postId).subscribe((post: Post) => {
      this.loading = false;
      this.post = post;
    });

  }

}
