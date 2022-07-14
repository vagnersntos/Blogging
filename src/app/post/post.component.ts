import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../model/post'

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  Post = {} as Post;
  Posts: Post[] | undefined;

  constructor(private PostsService: PostsService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.PostsService.getPosts().subscribe((Posts: Post[]) => {
      this.Posts = Posts;
    });
  }
}