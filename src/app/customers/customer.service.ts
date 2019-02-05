import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {Customer} from './customer';
import {query} from '@angular/animations';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private dbPath = '/customers';
    private dbOrder = 'name';

    customersRef: AngularFireList<Customer> = null;

    constructor(private db: AngularFireDatabase) { }

    queryAllCustomers(): void {
        this.customersRef = this.db.list(this.dbPath, ref => ref.orderByChild(this.dbOrder));
    }

    createCustomer(customer: Customer): void {
        this.customersRef.push(customer);
    }

    deleteCustomer(key: string): void {
        this.customersRef.remove(key).catch(error => this.handleError(error));
    }

    //!!!
    updateCustomer(id: string, value: any): void {
        this.db.object(`${this.dbPath}/${id}`).update(value).catch(error => this.handleError(error));
    }

    getCustomersList(): AngularFireList<Customer> {
        return this.customersRef;
    }

    getCustomerObj(id): AngularFireObject<Customer> {
        return this.db.object(`${this.dbPath}/${id}`);
    }



    deleteAll(): void {
        this.customersRef.remove().catch(error => this.handleError(error));
    }

    private handleError(error) {
        console.log(error);
    }
}
