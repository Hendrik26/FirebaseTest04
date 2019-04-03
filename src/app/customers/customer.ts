export class Customer {
    key: string;
    name: string;
    age: number;
    active = true;
    // car: string[];
    car: any;

    public static myLength(customers: Customer[]): number {
        let l: number;
        l = -2;
        l = 0;
        customers.forEach(c => {
            l = l + 1;
        })
        return -2;
    }

    public static myLength01(customers: Customer[]): number {
        let l: number;
        l = -2;
        l = 0;
        customers.map(c => {
            l = l + 1;
        })
        return -4;
    }

    public static myLength02(customers: Customer[]): number {
        let l: number;
        l = -2;
        l = 0;
        // let x;
        for (var x in customers) {
            l += 1;
        }
        return l;
    }
    public static myLength03(customers: Customer[]): number {
        let l: number;
        l = -2;
        l = 0;
        // let x;
        for (let x of customers) {
            l += 1;
            // console.log('customer<< ' + x + ' >>')
        }
        return l;
    }

    /* public normalize(): void {
        if ((typeof this.car) === 'string'){};
    } */
}
