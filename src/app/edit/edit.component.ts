import { Component, OnInit } from '@angular/core';
import {AddPostService} from '../add-post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {PostPayload} from '../add-post/post-payload';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  initTitle: string;
  permaLink: Number;
  post: PostPayload;
  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  body = new FormControl('');
  constructor(private postService: AddPostService, private router: Router, private activatedRoute: ActivatedRoute) {
    // this.activatedRoute.params.subscribe(params => {
    //   this.permaLink = params['id'];
    // });
    //
    // this.postService.getPost(this.permaLink).subscribe((data: PostPayload) => {
    //   this.post = data;
    // }, (err: any) => {
    //   console.log('Failure Response');
    // });
    //
    // console.log(this.post.title);
    //
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });
    this.postPayload = {
      id: '',
      detail: '',
      title: '',
      date: ''
    };
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.postService.getPost(this.permaLink).subscribe((data: PostPayload) => {
      this.post = data;
      console.log(this.post.title);
    }, (err: any) => {
      console.log('Failure Response');
    });
    this.title = new FormControl(this.post.title);
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });
    this.postPayload = {
      id: '',
      detail: '',
      title: '',
      date: ''
    };
  }
  addPost() {
    this.postPayload.detail = this.addPostForm.get('body').value;
    this.postPayload.title = this.addPostForm.get('title').value;
    this.postService.addPost(this.postPayload).subscribe(data => {
      this.router.navigateByUrl('/');
    }, error => {
      console.log('Failure Response');
    });
  }

}
