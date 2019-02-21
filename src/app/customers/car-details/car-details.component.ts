// import { Component, OnInit } from '@angular/core';

import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Car} from '../car';
import {Customer} from '../customer';
import {CustomerService} from '../customer.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

    @Input() car: Car;

    constructor(private customerService: CustomerService,
                private router: Router) {
    }

    ngOnInit() {
    }
    //////////////
}
