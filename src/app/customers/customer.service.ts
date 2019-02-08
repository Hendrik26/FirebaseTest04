import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import {Customer} from './customer';
import {query} from '@angular/animations';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private dbPath = '/customers';
    private dbOrder = 'name';

    customersRef: AngularFirestoreCollection<Customer> = null;

    constructor(private db: AngularFirestore) { }

    queryAllCustomers(): void {
        this.customersRef = this.db.collection(this.dbPath);
    }

    getCustomersList(): AngularFirestoreCollection<Customer> {
        return this.customersRef;
    }
/*
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


    getCustomerObj(id): AngularFireObject<Customer> {
        return this.db.object(`${this.dbPath}/${id}`);
    }



    deleteAll(): void {
        this.customersRef.remove().catch(error => this.handleError(error));
    }
    */

    private handleError(error) {
        console.log(error);
    }
}
