import { Component } from '@angular/core';
import {UserDetailsService} from './user-details.service';
import {PaginationService} from './pagination.service';
import {UserDetail} from './userDetail';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userDetails: UserDetail[];
  filteredUserDetails: UserDetail[];
  size: number = 10;
  page: number = 1;
  pageSize: any[] = [10, 25, 50, 100];
  totalPage: number;
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  date: string;
  constructor(
      private userDetailsService : UserDetailsService,
      private paginationService : PaginationService 
  ) { }

  ngOnInit(){
    this.userDetailsService.getJSON().subscribe(data => {
          this.userDetails= data;
          this.pagination();
      });
  }

  filter() {
    this.userDetailsService.getJSON().subscribe(data => {
      this.userDetails = data;
      if(this.id) {
        this.userDetails = this.userDetails.filter(user => {
          return String(user.id).indexOf(String(this.id)) > -1;
        });
      }
      if(this.first_name) {
        this.userDetails = this.userDetails.filter(user => {
          return user.first_name.indexOf(this.first_name) > -1;
        });
      }
      if(this.last_name) {
        this.userDetails = this.userDetails.filter(user => {
          return user.last_name.indexOf(this.last_name) > -1;
        });
      }

      if(this.gender) {
        this.userDetails = this.userDetails.filter(user => {
          return user.gender.indexOf(this.gender) > -1;
        });
      }

      if(this.email) {
        this.userDetails = this.userDetails.filter(user => {
          return user.email.indexOf(this.email) > -1;
        });
      }

      // new Date(myDate).getTime();
      this.pagination();
    });
  }

  pagination() {
    this.filteredUserDetails = this.paginationService.filter(this.page, this.size, JSON.parse(JSON.stringify(this.userDetails)));
    this.totalPage = Math.round(this.userDetails.length/this.size);
    console.log(this.totalPage);
    if(this.totalPage<=0)
      this.totalPage = 1
  }

  onPage(page) {
    this.page=page;
    this.pagination();
  }

  counter(i: number) {
    return new Array(i);
  }

}
