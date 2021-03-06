import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Customer} from './customer';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private dbPath = '/customers';

    customersRef: AngularFirestoreCollection<Customer> = null;

    constructor(private db: AngularFirestore) {
    }

    getCustomersList(sortDirStr, dbMinage, dbMaxage): AngularFirestoreCollection<Customer> {
        console.log(sortDirStr);
        this.customersRef = this.db.collection(this.dbPath,
                ref => ref.orderBy('age', sortDirStr).where('age', '>=', dbMinage).where('age', '<=', dbMaxage));
        return this.customersRef;
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
            'active': customer.active,
            'age': customer.age,
            'name': customer.name
        }).catch(error => this.handleError(error));
    }

    private handleError(error) {
        console.log(error);
    }
}
