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

    /* public normalize(): void {
        if ((typeof this.car) === 'string'){};
    } */
}
