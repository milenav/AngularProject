import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';
import { Router } from '@angular/router';
import { Post } from '../../shared/models/post.model';

@Component({
  selector: 'app-post-all',
  templateUrl: './post-all.component.html',
  styleUrls: ['./post-all.component.css']
})
export class PostAllComponent implements OnInit {
  postAll: Object[];

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
  }

  allPost() {
    this.postService.getAll().subscribe((data) => {
      this.router.navigate(['/posts/all'])
    })
  }

}
