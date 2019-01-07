// NT40801 Resources/WebService/App/Server.js
//

let Database = require('../data-access/Database')
let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')

class Server {

    constructor() {

        const port = 3001
        let app = express()

        this.database = new Database()

        // Set CORS

        app.use(cors())

        // Get the beverage collection.

        app.get('/data/beverages/', (req, res) => {

            this.getBeverages(req, res)
        })

        app.get('/data/beverages_slow/', (req, res) => {

            setTimeout( () => {

                this.getBeverages(req, res)
            
            }, 10000)
        })
        
        // Get an individual beverage.
        
        app.get('/data/beverages/:id', (req, res) => {

            this.getBeverage(req, res)
        })

        // Insert a new beverage.

        app.post('/data/beverages/', bodyParser.json(), (req, res) => {

            this.insertBeverage(req, res)
        })

        // Update an existing beverage.

        app.put('/data/beverages/:id', bodyParser.json(), (req, res) => {

            console.log('req.body:', req.body)
            this.updateBeverage(req, res)
        })

        // Delete an beverage.

        app.delete('/data/beverages/:id', (req, res) => {

            this.deleteBeverage(req, res)
        })

        // Get the pastry collection.

        app.get('/data/pastries/', (req, res) => {

            this.getPastries(req, res)
        })

        app.get('/data/pastries_slow/', (req, res) => {

            setTimeout( () => {

                this.getPastries(req, res)

            }, 10000)
        })
        
        // Get an individual beverage.
        
        app.get('/data/pastries/:id', (req, res) => {

            this.getPastry(req, res)
        })

        // Insert a new beverage.

        app.post('/data/pastries/', bodyParser.json(), (req, res) => {

            this.insertPastry(req, res)
        })

        // Update an existing beverage.

        app.put('/data/pastries/:id', bodyParser.json(), (req, res) => {

            console.log('req.body:', req.body)
            this.updatePastry(req, res)
        })

        // Delete an beverage.

        app.delete('/data/pastries/:id', (req, res) => {

            this.deletePastry(req, res)
        })

        // Listen on port 8081.

        console.info('Starting web service on port', port)
        app.listen(port)
    }

    deleteBeverage(req, res) {

        this.database.deleteBeverage(req.params.id, (err, beverage) => {

            if (err) {

                res.writeHead(500, 'Internal server error')
                console.error('deleteBeverage:', err)
            
            } else {

                res.writeHead(200, 'OK', { 'Content-Type': 'application/json' })
                console.log('deleteBeverage: 1 record deleted: ' + req.params.id)
            }

            res.end()	
        })
    }

    getBeverage(req, res) {

        this.database.getBeverage(req.params.id, (err, beverage) => {

            if (err) {

                res.writeHead(500, 'Internal server error')
                console.error('getBeverage:', err)
            
            } else {

                res.writeHead(200, 'OK', { 'Content-Type': 'application/json' })
                res.write(JSON.stringify(beverage))
                console.info(`getBeverage: %d records`, beverage ? 1 : 0)
            }

            res.end()			
        })
    }

    getBeverages(req, res) {

        this.database.getBeverages((err, beverages) => {

            if (err) {

                res.writeHead(500, 'Internal server error')
                console.error('getBeverages:', err)
            
            } else {

                res.writeHead(200, 'OK', { 'Content-Type': 'application/json' })
                res.write(JSON.stringify(beverages))
                console.info(`getBeverages: %d records`, beverages.length)
            }

            res.end()			
        })
    }

    insertBeverage(req, res) {

        let beverage = req.body

        this.database.insertBeverage(beverage, (err, beverage) => {

            if (err) {

                res.writeHead(500, 'Internal server error')
                console.error('getBeverage:', err)
            
            } else {

                res.writeHead(200, 'OK', { 'Content-Type': 'application/json', 'Content-Length': 0 });
                res.write(JSON.stringify(beverage))
                console.info(`insertBeverage: %d records`, beverage ? 1 : 0)
            }

            res.end();			
        })
    }

    updateBeverage(req, res) {

        let beverage = req.body

        this.database.updateBeverage(req.params.id, beverage, (err, beverage) => {

            if (err) {

                res.writeHead(500, 'Internal server error')
                console.error('getBeverage:', err)
            
            } else {

                res.writeHead(200, 'OK', { 'Content-Type': 'application/json' })
                res.write(JSON.stringify(beverage))
                console.info(`updateBeverage: %d records`, beverage ? 1 : 0)
            }

            res.end()		
        })
    }

    deletePastry(req, res) {

        this.database.deletePastry(req.params.id, (err, pastry) => {

            if (err) {

                res.writeHead(500, 'Internal server error')
                console.error('deletePastry:', err)
            
            } else {

                res.writeHead(200, 'OK', { 'Content-Type': 'application/json' })
                console.log('deletePastry: 1 record deleted: ' + req.params.id)
            }

            res.end()	
        })
    }

    getPastry(req, res) {

        this.database.getPastry(req.params.id, (err, pastry) => {

            if (err) {

                res.writeHead(500, 'Internal server error')
                console.error('getPastry:', err)
            
            } else {

                res.writeHead(200, 'OK', { 'Content-Type': 'application/json' })
                res.write(JSON.stringify(pastry))
                console.info(`getPastry: %d records`, pastry ? 1 : 0)
            }

            res.end()			
        })
    }

    getPastries(req, res) {

        this.database.getPastries((err, pastries) => {

            if (err) {

                res.writeHead(500, 'Internal server error')
                console.error('getPastries:', err)
            
            } else {

                res.writeHead(200, 'OK', { 'Content-Type': 'application/json' })
                res.write(JSON.stringify(pastries))
                console.info(`getPastries: %d records`, pastries.length)
            }

            res.end()			
        })
    }

    insertPastry(req, res) {

        let pastry = req.body

        this.database.insertPastry(pastry, (err, pastry) => {

            if (err) {

                res.writeHead(500, 'Internal server error')
                console.error('getPastry:', err)
            
            } else {

                res.writeHead(200, 'OK', { 'Content-Type': 'application/json', 'Content-Length': 0 });
                res.write(JSON.stringify(pastry))
                console.info(`insertPastry: %d records`, pastry ? 1 : 0)
            }

            res.end();			
        })
    }

    updatePastry(req, res) {

        let pastry = req.body

        this.database.updatePastry(req.params.id, pastry, (err, pastry) => {

            if (err) {

                res.writeHead(500, 'Internal server error')
                console.error('getPastry:', err)
            
            } else {

                res.writeHead(200, 'OK', { 'Content-Type': 'application/json' })
                res.write(JSON.stringify(pastry))
                console.info(`updatePastry: %d records`, pastry ? 1 : 0)
            }

            res.end()		
        })
    }
}

module.exports = exports = Server