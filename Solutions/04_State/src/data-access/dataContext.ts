// dataContext.js
// Copyright © NextStep IT Training. All rights reserved.
//

import Product from './Product';

let beveragesURI = 'http://localhost:3001/data/beverages';
let beveragesSlowURI = 'http://localhost:3001/data/beverages_slow';
let pastriesURI = 'http://localhost:3001/data/pastries';
let pastriesSlowURI = 'http://localhost:3001/data/pastries_slow';

class BeverageContext {

    public async deleteBeverage(id: number): Promise<void>  {
           
        await fetch(`${beveragesURI}/${id}`, { method: 'DELETE' });
    }

    public async getBeverages(): Promise<Product[]> {

        const result: any = await fetch(`${beveragesURI}`);
        const rows: any = await result.json();
        let products: Product[] = [];

        if (Array.isArray(rows)) {

            products = rows.map( (row: any) => this.buildBeverage(row) );
        }

        return products;
    }

    public async getBeveragesSlow() {

        const result: any = await fetch(`${beveragesSlowURI}`);
        const rows: any = await result.json();
        let products: Product[] = [];

        if (Array.isArray(rows)) {

            products = rows.map( (row: any) => this.buildBeverage(row) );
        }

        return products;
    }

    public async getBeverage(id: number) {
           
        const result = await fetch(`${beveragesURI}/${id}`);
        const row = await result.json();

        return this.buildBeverage(row);
    }

    public async insertBeverage(beverage: Product) {
           
        const result = await fetch(`${beveragesURI}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(beverage) });
        const row = await result.json();
        
        return this.buildBeverage(row);
    }

    public async updateBeverage(id: number, beverage: Product) {
           
        const result = await fetch(`${beveragesURI}/${id}`, { method: 'PUT', headers: { 'content-type': 'application/json' },  body: JSON.stringify(beverage) });
        const row = await result.json();
        
        return this.buildBeverage(row);
    }

    public buildBeverage(row: any) {

        // Translate the JSON data into an Beverage instance.
                        
        let beverage = new Product(row)
        
        return beverage
    }
}

class PastryContext {

    public async deletePastry(id: number): Promise<void> {
           
        await fetch(`${pastriesURI}/${id}`, { method: 'DELETE' });
    }

    public async getPastries(): Promise<Product[]> {

        const result: any = await fetch(`${pastriesURI}`);
        const rows: any = await result.json();
        let products: Product[] = [];

        if (Array.isArray(rows)) {

            products = rows.map( (row: any) => this.buildPastry(row) );
        }

        return products;
    }

    public async getPastriesSlow(): Promise<Product[]> {

        const result: any = await fetch(`${pastriesSlowURI}`);
        const rows: any = await result.json();
        let products: Product[] = [];

        if (Array.isArray(rows)) {

            products = rows.map( (row: any) => this.buildPastry(row) );
        }

        return products;
    }

    public async getPastry(id: number) {
           
        return fetch(`${pastriesURI}/${id}`)
                .then( (result) => result.json() )
                .then( (row) => this.buildPastry(row) )
    }

    public async insertPastry(pastry: Product): Promise<Product> {
           
        const result = await fetch(`${pastriesURI}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(pastry) });
        const row = await result.json();
        
        return this.buildPastry(row);
    }

    public async updatePastry(id: number, pastry: Product): Promise<Product> {
           
        const result = await fetch(`${beveragesURI}/${id}`, { method: 'PUT', headers: { 'content-type': 'application/json' },  body: JSON.stringify(pastry) });
        const row = await result.json();
        
        return this.buildPastry(row);
    }

    public buildPastry(row: any) {

        // Translate the JSON data into an Pastry instance.
                        
        let pastry = new Product(row)
        
        return pastry
    }
}

class DataContext {

    public beverageContext: BeverageContext;
    public pastryContext: PastryContext;

    constructor() {

        this.beverageContext = new BeverageContext();
        this.pastryContext = new PastryContext();
    }
}

export default (new DataContext());