import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../shared/models/post.model';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  postEditForm: FormGroup;
  post: Post;
  id: string;

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router, private route: ActivatedRoute, ) {  }
 
  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.postService.getDetails(this.id).subscribe(data => {
        this.post = data;
        this.postEditForm = this.fb.group({
          title: [this.post.title, [Validators.required, Validators.minLength(3), Validators.maxLength(23)]],
          author: [this.post.author, [Validators.required, Validators.minLength(3), Validators.maxLength(23)]],
          content: [this.post.content, [Validators.required, Validators.minLength(200), Validators.maxLength(5000)]],
          image: [this.post.image, [Validators.required]]
        });
      })
    })

  }


  get title() { return this.postEditForm.get('title'); }
  get author() { return this.postEditForm.get('author'); }
  get content() { return this.postEditForm.get('content'); }
  get image() { return this.postEditForm.get('image'); }

  editPost() {
    const valueForm = this.postEditForm.value;
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.editPost(valueForm, id).subscribe((data) => {
      this.router.navigate(['/posts']);
    })

  }

}
