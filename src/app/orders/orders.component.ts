import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Order } from './orders';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['input', 'output'];
  data: Order[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getOrders()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  handleClick(event: Event) {
    this.ngOnInit();
  }
}
