import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postGreateForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.postGreateForm = this.fb.group({
      title: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(23)]],
      author: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(23)]],
      content: [ '', [Validators.required, Validators.minLength(200), Validators.maxLength(5000)]],
      image: [ '', [Validators.required]]
    })
  }

}
