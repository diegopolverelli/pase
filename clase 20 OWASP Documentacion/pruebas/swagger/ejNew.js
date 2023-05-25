let moment = require('moment');
let fs=require('fs')


function allocate (salesOrders, salesOrders1, purchaseOrders) {
    if(!Array.isArray(salesOrders1)||!Array.isArray(salesOrders)||!Array.isArray(purchaseOrders)) throw Error('Error, ambos parametros deben ser String')

    let oNew=[]
    salesOrders.forEach(o=>{
        let fecha1 = moment(o.created);
        let fecha2 = moment(Date.now());

        var diferenciaEnDias = fecha2.diff(fecha1, 'd');
        o.dias=diferenciaEnDias;

        if(diferenciaEnDias>14){
            salesOrders1.unshift(o)
        }else{
            oNew.push(o)
        }
    })

    salesOrders=oNew;

    fs.writeFileSync('./noPremium.json',JSON.stringify(salesOrders,null,5))
    fs.writeFileSync('./Premium.json',JSON.stringify(salesOrders1,null,5))

    const orderedSales=salesOrders.sort((a,b)=>new Date(a.created)- new Date(b.created))
    const orderedSales1=salesOrders1.sort((a,b)=>new Date(a.created)- new Date(b.created))


    const orderedPurchases=purchaseOrders.sort((a,b)=>new Date(a.received) - new Date(b.receiving))
    const allocatedOrders=[]
    let totalQuantityInStock=0;
    while (orderedPurchases.length>0){
        currentPurchase=orderedPurchases.shift();
        totalQuantityInStock+=currentPurchase.quantity
    }

    console.log('Stock total: ',totalQuantityInStock)

    while (orderedSales1.length>0){
        while(totalQuantityInStock>=orderedSales1[0].quantity)
        {
            const salesOrder=orderedSales1.shift();
            allocatedOrders.push({
                id:salesOrder.id,
                date:currentPurchase.receiving
            })
            totalQuantityInStock-=salesOrder.quantity
            if(orderedSales1.length===0) break;
        }
    }

    console.log('Stock total despues Premium: ',totalQuantityInStock)

    while (orderedSales.length>0){
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








let salesOrders1=[
    {
        id:100,
        descrip:'cama',
        quantity:1,
        created: new Date(2023,4,23)
    },
    {
        id:101,
        descrip:'cama',
        quantity:1,
        created: new Date(2023,4,23)
    },
]

let salesOrders=[
    {
        id:1,
        descrip:'cama',
        quantity:1,
        created: new Date(2023,4,10)
    },
    {
        id:2,
        descrip:'cama',
        quantity:1,
        created: new Date(2023,3,8)
    },
    {
        id:3,
        descrip:'cama',
        quantity:1,
        created: new Date(2023,4,15)
    },
    {
        id:4,
        descrip:'cama',
        quantity:1,
        created: new Date(2023,4,12)
    },
    {
        id:5,
        descrip:'cama',
        quantity:1,
        created: new Date(2023,4,4)
    },
    {
        id:6,
        descrip:'cama',
        quantity:1,
        created: new Date(2023,4,22)
    },
    {
        id:7,
        descrip:'cama',
        quantity:1,
        created: new Date(2023,3,10)
    },
]

let purchaseOrders=[
    {
        receiving: Date.now(),
        quantity: 2
    },
    {
        receiving: Date.now(),
        quantity: 20
    }

]

// allocate(salesOrders, salesOrders1, purchaseOrders)
console.log('Ordenes colocadas: ',allocate(salesOrders, salesOrders1, purchaseOrders))
console.log('Ordenes no premium pendientes: ', salesOrders)
console.log('Ordenes premium pendientes: ', salesOrders1)