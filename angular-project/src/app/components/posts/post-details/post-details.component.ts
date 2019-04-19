import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';
import { Post } from '../../shared/models/post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: Post;

  constructor(
    private postService: PostService, 
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService,
    ) { }

  ngOnInit() {    
    this.route.params.subscribe(data => {
      let id = data['id'];
      this.postService.getDetails(id).subscribe((data) => {
        this.post = data;
      })
    })
  }  

  deletePost(id: string) {
    this.postService.deletePost(id)
      .subscribe(() => {
        this.router.navigate(['/posts']);
      })
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
