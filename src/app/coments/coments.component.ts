import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../model/post'


@Component({
  selector: 'coments',
  templateUrl: './coments.component.html',
  styleUrls: ['./coments.component.css']
})
export class ComentsComponent implements OnInit {

  Comment = {} as Post;
  Comments: Post[] | undefined;

  constructor(private PostsService: PostsService) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.PostsService.getComments().subscribe((Comments: Post[]) => {
      this.Comments = Comments;
      this.menuComments(Comments)
    });
  }

  menuComments = (data: any) => {
    const tree = document.querySelector('div#comment')
    const menu = document.createElement('ul')

    const authorFirst = data.filter((item: { respondsTo: Post; }) => !item.respondsTo)
    const responseAuthorFirst = data.filter((item: { respondsTo: Post; }) => item.respondsTo)
    const getFirstLis = authorFirst.map(buildTree)
    const getResponseAuthorFirst = responseAuthorFirst.map(buildTree)
    // getResponseAuthorFirst.forEach((item: string) => {menu.append(item)})

    getFirstLis.forEach((li: string) => { menu.append(li) })

    function buildTree(item: Post) {
     const span = document.createElement('li')
      span.innerHTML = item.author.username

      if (item.respondsTo !== null) {
        const children = authorFirst.filter((child: Post) => child.id === item.respondsTo.id)

        if (children.length > 0) {
          span.classList.add('has-children')
          const subMenu = document.createElement('ul')
          children.map(buildTree)
            .forEach((li: string) => subMenu.append(li))
          span.append(subMenu)
        }
      }

      return span
    }
   tree ? tree.append(menu) : null
  }

}
