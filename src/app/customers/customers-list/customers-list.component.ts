import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {Customer} from '../customer';
import {CustomerService} from '../customer.service';

@Component({
    selector: 'customers-list',
    templateUrl: './customers-list.component.html',
    styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

    customers: Customer[];
    sortOrder = 'name';
    sortDir = '1';
    minage = 0;
    maxage = 100000;

    public static compareCustomerByName(customer1: Customer, customer2: Customer): number {
        if (customer1.name.trim().toLowerCase() < customer2.name.trim().toLowerCase()) {
            return -1;
        }
        return 1;
    }

    constructor(private customerService: CustomerService) {
    }

    ngOnInit() {
        this.getCustomersList('asc', this.minage, this.maxage);
    }

    orderChange() {
        if (this.sortDir === '1') {
            this.getCustomersList('asc', this.minage, this.maxage);
        } else {
            this.getCustomersList('desc', this.minage, this.maxage);
        }
    }

    getCustomersList(sortDirStr, minage, maxage) {
        // Use snapshotChanges().map() to store the key ////
        this.customerService.getCustomersList(sortDirStr, minage, maxage).snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
            )
        ).subscribe(customers => {
            this.customers = customers;
            if (this.sortOrder === 'name') {
                const sortDirNum = Number(this.sortDir);
                this.customers.sort(function (a, b) {
                    return sortDirNum *  CustomersListComponent.compareCustomerByName(a, b);
                });
            }
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
