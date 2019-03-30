// use Cloud Firestore

import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import {Customer} from './customer';
import {map} from 'rxjs/operators';
import {Observable, combineLatest} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private dbPath = '/customers';
    private dbPathCars = '/car';
    private carsList: Observable<any>;
    private customersList: Observable<any>;
    private carsByCustomersList: Observable<any>;

    carsRef: AngularFirestoreCollection<Customer> = null;
    customersRef: AngularFirestoreCollection<Customer> = null;

    constructor(private db: AngularFirestore) {
    }

    getCustomersList(sortDirStr, dbMinage, dbMaxage): Observable<any> {
        console.log(sortDirStr);
        console.log('Method CustomerService.getCustomersList() started!!!');
        this.customersRef = this.db.collection(this.dbPath,
                ref => ref.orderBy('age', sortDirStr).where('age', '>=', dbMinage)
                    .where('age', '<=', dbMaxage));
        return this.customersRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
            )
        );
        // console.log('Method CustomerService.getCustomersList() done!!!');
    }

    getCarsList(sortDirStr, dbMinHorsepower, dbMaxHorsepower): Observable<any> {
        // Fehlerquelle in dieser Methode
        console.log(sortDirStr);
        console.log('Method CustomerService.getCarsList() started!!!');
        this.carsRef = this.db.collection(this.dbPathCars,
                ref => ref.orderBy('horsepower', sortDirStr)); // .where('horsepower', '>=', dbMinHorsepower));
                    // .where('horsepower', '<=', /* dbMaxHorsepower */ 1000)); // Fehlerquelle hier
        return this.carsRef.snapshotChanges().pipe(
            map(changes =>
                changes.map(c => ({key: c.payload.doc.id, ...c.payload.doc.data()}))
            )
        );
    }

    getCarsByCustomersList(sortDirStr, dbMinage, dbMaxage, dbMinHorsepower, dbMaxHorsepower): Observable<any> {
        this.carsList = this.getCarsList(sortDirStr, dbMinHorsepower, dbMaxHorsepower);
        this.customersList = this.getCustomersList(sortDirStr, dbMinage, dbMaxage);
        this.carsByCustomersList = combineLatest(this.customersList, this.carsList);
        return this.carsByCustomersList;
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
