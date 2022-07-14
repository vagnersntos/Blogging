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

    const authorFirst = data.filter((item: { respondsTo: Post; }) => !item.respondsTo)//não responderam
    const responseAuthorFirst = data.filter((item: { respondsTo: Post; }) => item.respondsTo) // responderam
    const getFirstLis = authorFirst.map(buildTree)
    getFirstLis.forEach((li: string) => { menu.append(li) })

    function buildTree(item: Post) {
      const span = document.createElement('span')
      const date = new Date(item.timestamp)
      const dateFormat = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'} ).format(date)
      console.log(dateFormat)
      span.innerHTML = item.author.username + dateFormat + '<br>' + item.content

      const children = responseAuthorFirst.filter((child: Post) => child.respondsTo.id === item.author.id)

      if (children.length > 0) {
        span.classList.add('has-children')
        const subMenu = document.createElement('ul')
        children.map(buildTree)
          .forEach((li: string) => subMenu.append(li))
        span.append(subMenu)
      }
      return span
    }
    tree ? tree.append(menu) : null
  }
}
