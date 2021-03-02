import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }

  filter(page, size, data) {
    let position = (page-1)*size;
    return data.splice(position,size);
  }
}
