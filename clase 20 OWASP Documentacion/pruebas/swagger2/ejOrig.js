function allocate (salesOrders, purchaseOrders) {
    if(!Array.isArray(salesOrders)||!Array.isArray(purchaseOrders)) throw Error('Error, ambos parametros deben ser String')
    const orderedSales=salesOrders.sort((a,b)=>new Date(a.created)- new Date(b.created))
    const orderedPurchases=purchaseOrders.sort((a,b)=>new Date(a.received) - new Date(b.receiving))
    const allocatedOrders=[]
    let totalQuantityInStock=0;
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
        quantity: 50
    }

]


console.log('Ordenes colocadas: ',allocate(salesOrders, purchaseOrders))
console.log('Ordenes no premium pendientes: ', salesOrders)
