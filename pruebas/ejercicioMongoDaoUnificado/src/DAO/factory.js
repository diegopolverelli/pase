export let Contacts

let tipo='NOMONGO'

if(tipo=='MONGO'){

    const {default:ContactMongo} = await import('./mongo/mongoDAO.js')
    Contacts=ContactMongo;

}else{
    const {default:ContactMemory} = await import('./memory/memoryDAO.js')
    Contacts=ContactMemory;
}

