import { config } from '../config/config.js';
const PERSISTENCIA=config.app.PERSISTENCIA

let dao;
export const persistencia=async()=>{
    switch (PERSISTENCIA) {
        case 'MONGO':
            dao=await import('./databaseDao.js')
            console.log(dao)
            return new dao.DatabaseDAO()       
            break;
        case 'MEMORY':
            dao=await import('./memoryDao.js')
            return new dao.MemoryDAO()       

            break;
        default:
            break;
    }

}