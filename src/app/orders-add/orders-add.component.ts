import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrdersComponent } from '../orders/orders.component';

@Component({
  selector: 'app-orders-add',
  templateUrl: './orders-add.component.html',
  styleUrls: ['./orders-add.component.scss']
})
export class OrdersAddComponent implements OnInit {

  orderForm: FormGroup;
  input:string='';
  output:string='';
  isLoadingResults = false;

  constructor(private orders: OrdersComponent, private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      'input' : [null, Validators.required],
      'output' : [null]
    });
    this.orderForm.controls['output'].disable();
  }

  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.addOrder(form)
      .subscribe(res => {
          console.log(res.output);
          this.output = res.output;
          this.orderForm.controls['output'].setValue(res.output);
          this.isLoadingResults = false;
          this.router.navigate(['/orders']);
          this.orders.ngOnInit(); 
          console.log(res.output);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
