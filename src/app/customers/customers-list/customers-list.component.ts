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
    sortDir = 'asc';
    minage = 0;

    constructor(private customerService: CustomerService) {
    }

    ngOnInit() {
        this.getCustomersList('name', 'asc', 0);
    }

    orderChange() {
        this.getCustomersList(this.sortOrder, this.sortDir, this.minage);
    }

    getCustomersList(sortOrder, orderDir, minage) {
        // Use snapshotChanges().map() to store the key
        this.customerService.getCustomersList(sortOrder, orderDir, minage).snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
            )
        ).subscribe(customers => {
            this.customers = customers;
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
