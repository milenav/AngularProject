import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';
import { Router } from '@angular/router';
import { Post } from '../../shared/models/post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-all',
  templateUrl: './post-all.component.html',
  styleUrls: ['./post-all.component.css']
})
export class PostAllComponent implements OnInit {
  Posts: Object[];

  constructor(private postService: PostService, private router: Router) { }
  allPosts: Array<Post>;
  ngOnInit() {
    this.postService.getAll().subscribe(data => {
      this.allPosts = data;
    })
  }

 /* isAuthor(post: Object) {
    return post['_acl']['creator'] === localStorage.getItem('userId');
  }*/

 
}
