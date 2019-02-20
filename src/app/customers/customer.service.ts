import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Customer} from './customer';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private dbPath = '/customers';
    private dbPathCars = '/cars';

    carsRef: AngularFirestoreCollection<Customer> = null;
    customersRef: AngularFirestoreCollection<Customer> = null;

    constructor(private db: AngularFirestore) {
    }

    getCustomersList(sortDirStr, dbMinage, dbMaxage): Observable<any> {
        console.log(sortDirStr);
        this.customersRef = this.db.collection(this.dbPath,
                ref => ref.orderBy('age', sortDirStr).where('age', '>=', dbMinage)
                    .where('age', '<=', dbMaxage));
        return this.customersRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
            )
        );
    }

    getCarsList(sortDirStr, dbMinHorsepower, dbMaxHorsepower): Observable<any> {
        console.log(sortDirStr);
        this.carsRef = this.db.collection(this.dbPathCars,
                ref => ref.orderBy('horsepower', sortDirStr).where('horsepower', '>=', dbMinHorsepower)
                    .where('horsepower', '<=', dbMaxHorsepower));
        return this.carsRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
            )
        );
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


    getCustomerObj(id): Observable<any> {
        return this.db.doc(`${this.dbPath}/${id}`).valueChanges();
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
