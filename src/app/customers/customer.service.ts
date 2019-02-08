import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
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

    constructor(private db: AngularFirestore) {
    }

    getCustomersList(): AngularFirestoreCollection<Customer> {
        return this.customersRef = this.db.collection(this.dbPath, ref => ref.orderBy(this.dbOrder));
    }

    createCustomer(customer: Customer): void {
        this.db.collection(this.dbPath).add({
            'active': customer.active,
            'age': customer.age,
            'name': customer.name
        }).catch(error => this.handleError(error));
    }

    deleteCustomer(id: string): void {
        this.db.doc(`${this.dbPath}/${id}`).delete().catch(error => this.handleError(error));

    }


    getCustomerObj(id): AngularFirestoreDocument<Customer> {
        return this.db.doc(`${this.dbPath}/${id}`);
    }

    updateCustomerActive(id: string, active: boolean): void {
        this.db.doc(`${this.dbPath}/${id}`).update({
            'active': active
        }).catch(error => this.handleError(error));
    }

    updateCustomer(id: string, customer: Customer): void {
        this.db.doc(`${this.dbPath}/${id}`).update({
            'age': customer.age,
            'name': customer.name
        }).catch(error => this.handleError(error));
    }

          deleteAll(): void {
              //this.customersRef.remove().catch(error => this.handleError(error));
              this.db.collection(this.dbPath).
          }


    private handleError(error) {
        console.log(error);
    }
}
