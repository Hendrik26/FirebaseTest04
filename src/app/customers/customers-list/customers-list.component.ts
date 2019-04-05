import {Component, OnInit} from '@angular/core';
import {Car} from '../car';
import {Customer} from '../customer';
import {CustomerService} from '../customer.service';

@Component({
    selector: 'customers-list',
    templateUrl: './customers-list.component.html',
    styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

    // New branch cars2019-02-20hh2019-04-05 /////

    cars: Car[];
    carsCombined: Car[];
    customers: Customer[];
    customersCombined: Customer[];
    sortOrder = 'name';
    sortOrderCars = 'type';
    sortDir = '1';
    minage = 0;
    maxage = 100000;
    minHorsepower = 0;
    maxHorsepower = 100000;

    private static compareCarsByType(car1: Car, car2: Car): number {
        if (car1.type.trim().toLowerCase() < car2.type.trim().toLowerCase()) {
            return -1;
        }
        return 1;
    }

    private static compareCustomersByName(customer1: Customer, customer2: Customer): number {
        if (customer1.name.trim().toLowerCase() < customer2.name.trim().toLowerCase()) {
            return -1;
        }
        return 1;
    }

    constructor(private customerService: CustomerService) {
    }

    ngOnInit() {
        this.getCustomersList('asc', this.minage, this.maxage);
        this.getCarsList('asc', this.minHorsepower, this.maxHorsepower);
        this.getCarsByCustomersList('asc', this.minage, this.maxage,this.minHorsepower, this.maxHorsepower);
    }

    orderChange() {
        if (this.sortDir === '1') {
            this.getCustomersList('asc', this.minage, this.maxage);
            this.getCarsList('asc', this.minHorsepower, this.maxHorsepower);
            this.getCarsByCustomersList('asc', this.minage, this.maxage,this.minHorsepower, this.maxHorsepower);
        } else {
            this.getCustomersList('desc', this.minage, this.maxage);
            this.getCarsList('desc', this.minHorsepower, this.maxHorsepower);
            this.getCarsByCustomersList('desc', this.minage, this.maxage,this.minHorsepower, this.maxHorsepower);
        }
    }

    getCustomersList(sortDirStr, minage, maxage) {
        // Use snapshotChanges().map() to store the key ////
        this.customerService.getCustomersList(sortDirStr, minage, maxage).subscribe(customers => {
            this.customers = customers;
            if (this.sortOrder === 'name') {
                const sortDirNum = Number(this.sortDir);
                this.customers.sort(function (a, b) {
                    return sortDirNum *  CustomersListComponent.compareCustomersByName(a, b);
                });
            }
        });
    }

    getCarsList(sortDirStr, minHorsepower, maxHorsepower) {
        // Use snapshotChanges().map() to store the key ////
        this.customerService.getCarsList(sortDirStr, minHorsepower, maxHorsepower).subscribe(cars => {
            this.cars = cars;
            if (this.sortOrderCars === 'type') {
                const sortDirNum = Number(this.sortDir);
                this.cars.sort(function (a, b) {
                    return sortDirNum *  CustomersListComponent.compareCarsByType(a, b);
                });
            }
        });
    }

    getCarsByCustomersList(sortDirStr, dbMinage, dbMaxage, dbMinHorsepower, dbMaxHorsepower): void {
        this.customerService.getCarsByCustomersList(sortDirStr, dbMinage, dbMaxage, dbMinHorsepower, dbMaxHorsepower)
            .subscribe(([customers, cars]) => {
                this.customersCombined = customers;
                this.carsCombined = cars;
            });
    }

    deleteAllCustomers() {
        if (confirm('wirklich alle Einträge löschen?')) {
            for (let i = 0; i < this.customers.length; i++) {
                this.customerService.deleteCustomer(this.customers[i].key);
            }
        }
    }


}
