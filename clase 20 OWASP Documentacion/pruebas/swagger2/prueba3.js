import moment from 'moment'
function allocate(salesOrders, premium, purchaseOrders) {

    if (!Array.isArray(salesOrders) || !Array.isArray(premium) || !Array.isArray(purchaseOrders)) throw Error('Error, ambos parametros deben ser String')


    let ocNoViejas = []
    salesOrders.forEach(o => {
        let d1 = moment(o.created)
        let d2 = moment(Date.now())
        // console.log(d2.diff(d1,"days"))
        o.antiguedad = d2.diff(d1, "days")
        if (o.antiguedad > 14) {
            premium.unshift(o)
        } else {
            ocNoViejas.push(o)
        }
    })

    while (salesOrders.length > 0) salesOrders.shift()
    while (ocNoViejas.length > 0) {
        let oc = ocNoViejas.shift()
        salesOrders.push(oc)
    }

    const orderedSales = salesOrders.sort((a, b) => new Date(a.created) - new Date(b.created))
    const orderedPurchases = purchaseOrders.sort((a, b) => new Date(a.received) - new Date(b.receiving))
    const allocatedOrders = []
    let totalQuantityInStock = 0;
    let ultFecPur;

    while (premium.length > 0 && orderedPurchases.length > 0) {
        let currentPurchase = orderedPurchases.shift();
        ultFecPur = currentPurchase.receiving
        totalQuantityInStock += currentPurchase.quantity;
        while (totalQuantityInStock >= premium[0].quantity) {
            const salesOrder = premium.shift();
            allocatedOrders.push({
                id: salesOrder.id,
                date: currentPurchase.receiving
            })
            totalQuantityInStock -= salesOrder.quantity
            if (premium.length === 0) break;
        }
    }

    if(orderedPurchases.length<=0 && totalQuantityInStock>0){
        orderedPurchases.push({
            quantity:totalQuantityInStock,
            receiving:ultFecPur
        })
        totalQuantityInStock=0
    }

    while (orderedSales.length>0&&orderedPurchases.length>0){
        let currentPurchase=orderedPurchases.shift();
        totalQuantityInStock+=currentPurchase.quantity;
        while(totalQuantityInStock>=orderedSales[0].quantity)
        {
            const salesOrder=orderedSales.shift();
            allocatedOrders.push({
                id:salesOrder.id,
                date:currentPurchase.receiving
            })
            totalQuantityInStock-=salesOrder.quantity
            if(orderedSales.length===0) break;
        }
    }


    return allocatedOrders
}

let salesPremium = [
    {
        id: 101,
        descrip: 'cama',
        quantity: 1,
        created: new Date(2023, 4, 19)
    },
    {
        id: 102,
        descrip: 'cama',
        quantity: 1,
        created: new Date(2023, 3, 26)
    },
]

let salesOrders = [
    {
        id: 1,
        descrip: 'cama',
        quantity: 1,
        created: new Date(2023, 4, 10)
    },
    {
        id: 2,
        descrip: 'cama',
        quantity: 1,
        created: new Date(2023, 3, 8)
    },
    {
        id: 3,
        descrip: 'cama',
        quantity: 1,
        created: new Date(2023, 4, 15)
    },
    {
        id: 4,
        descrip: 'cama',
        quantity: 1,
        created: new Date(2023, 4, 12)
    },
    {
        id: 5,
        descrip: 'cama',
        quantity: 1,
        created: new Date(2023, 4, 4)
    },
    {
        id: 6,
        descrip: 'cama',
        quantity: 1,
        created: new Date(2023, 4, 22)
    },
    {
        id: 7,
        descrip: 'cama',
        quantity: 1,
        created: new Date(2023, 3, 10)
    },
]

let purchaseOrders = [
    {
        receiving: Date.now(),
        quantity: 5
    },
    {
        receiving: Date.now(),
        quantity: 1
    },
    {
        receiving: Date.now(),
        quantity: 1
    }
]


console.log('Ordenes colocadas: ', allocate(salesOrders, salesPremium, purchaseOrders))
console.log('Ordenes no premium pendientes: ', salesOrders)
console.log('Ordenes premium pendientes: ', salesPremium)
