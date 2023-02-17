import { Component, OnInit } from '@angular/core';
import {BookListService} from './book-list.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BookList';
  bookList: any;
  constructor(private service:BookListService) {}
  
  ngOnInit() {
      this.service.getBookList()
        .subscribe((response:any) => {
          this.bookList = response.items;
          console.log(this.bookList)
        });
  }
}
