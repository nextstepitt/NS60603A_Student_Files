// NT40801 Resources/WebService/DataAccess/Database.js
//
// This module relies on sqlite which wraps sqlite3 with promises, and bluebird which sqlite uses for promises. Sqlite3 should
// install with binaries OK out of the box for macOS and Windows.
//

let path = require('path')
let db = require('sqlite')
let Promise = require('bluebird')

let Beverage = require('../entities/Beverage')
let Pastry = require('../entities/Beverage')

let ProductTypeBeverage = 'Beverage'
let ProductTypePastry = 'Pastry'

class Database {

    constructor() {

        // Get the database environment set up and open.

        db.open(path.normalize(__dirname + '/../SQLite/tccc.db'), { Promise })
            .then( (newdb) => { this.db = newdb; }, (err) => { console.error(err) } )
    }

    deleteBeverage(id,  callback) {

        let sql = "delete from Products where id = ?"

        // Note: db.exec did not actually delete anything, although the results came back. Changing this to db.all fixed that.

        this.db.prepare(sql, id).then( (statement) => {

            statement.run(id).then( (results) => {

                callback(null, null)

            });

        }).catch( (err) => {

            callback(err)
        })
    }

    getBeverage(id, callback) {

        let sql = "select * from Products where id = ?"
            
        db.all(sql, id).then( (results) => {

            let beverages = []

            results.forEach( (row) => {

                beverages.push(new Beverage(row))
            });

            callback(null, beverages.length >= 1 ? beverages[0] : null)
        
        }, (err) =>  {

            callback(err)
        })
    }

    getBeverages(callback) {

        let sql = "select p.id as id, p.name as name, price from Products p inner join ProductTypes pt where p.product_type_id = pt.id and pt.name = ?"

        this.db.all(sql, ProductTypeBeverage).then( (results) => {

            let beverages = [];

            results.forEach( (row) => {

                beverages.push(new Beverage(row))
            });

            callback(null, beverages)
        
        }, (err) =>  {

            callback(err)
        })
    }

    insertBeverage(beverage, callback) {

        let sql = "insert into Products (product_type_id, name, price) select id ?, ? from ProductTypes pt where pt.name = ?"

        this.db.all(sql, beverage.name, beverage.price, ProductTypeBeverage).then( (results) => {

            // If we made it this far get the last inserted ID on this connection.
            
            let sql = 'select last_insert_rowid()'

            this.db.all(sql).then( (results) => {

                // Now get the new inserted beverage and return it.

                this.getBeverage(results[0]['last_insert_rowid()'], callback)

            }, (err) => {

                callback(err)
            });
        
        }, (err) =>  {

            callback(err)
        });
    }

    updateBeverage(id, beverage, callback) {

        let sql = "update Products set name = ?, price = ? where id = ?"

        this.db.all(sql, beverage.name, beverage.price, id).then( (results) => {

            callback(null, beverage)

        }, (err) => {

            callback(err)
        });
    }

    deletePastry(id,  callback) {

        let sql = "delete from Products where id = ?"

        // Note: db.exec did not actually delete anything, although the results came back. Changing this to db.all fixed that.

        this.db.prepare(sql, id).then( (statement) => {

            statement.run(id).then( (results) => {

                callback(null, null)

            });

        }).catch( (err) => {

            callback(err)
        })
    }

    getPastry(id, callback) {

        let sql = "select * from Products where id = ?"
            
        db.all(sql, id).then( (results) => {

            let pastries = []

            results.forEach( (row) => {

                pastries.push(new Pastry(row))
            });

            callback(null, pastries.length >= 1 ? pastries[0] : null)
        
        }, (err) =>  {

            callback(err)
        })
    }

    getPastries(callback) {
        
        let sql = "select p.id as id, p.name as name, price from Products p inner join ProductTypes pt where p.product_type_id = pt.id and pt.name = ?"

        this.db.all(sql, ProductTypePastry).then( (results) => {

            let pastries = [];

            results.forEach( (row) => {

                pastries.push(new Pastry(row))
            });

            callback(null, pastries)
        
        }, (err) =>  {

            callback(err)
        })
    }

    insertPastry(pastry, callback) {

        let sql = "insert into Products (product_type_id, name, price) select id, ?, ? from ProductTypes pt where pt.name = ?"

        this.db.all(sql, pastry.name, pastry.price, ProductTypePastry).then( (results) => {
    
            // If we made it this far get the last inserted ID on this connection.
            
            let sql = 'select last_insert_rowid()'

            this.db.all(sql).then( (results) => {

                // Now get the new inserted pastry and return it.

                this.getPastry(results[0]['last_insert_rowid()'], callback)

            }, (err) => {

                callback(err)
            });
        
        }, (err) =>  {

            callback(err)
        });
    }

    updatePastry(id, pastry, callback) {

        let sql = "update Pastries set name = ?, price = ? where id = ?"

        this.db.all(sql, pastry.name, pastry.price, id).then( (results) => {

            callback(null, pastry)

        }, (err) => {

            callback(err)
        });
    }

    quote(value) {

        return value.replace(/'/, '\'\'')
    }
}

module.exports = exports = Database