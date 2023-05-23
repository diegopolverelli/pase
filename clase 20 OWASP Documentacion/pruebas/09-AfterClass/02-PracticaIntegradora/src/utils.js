import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import mailer from 'nodemailer'

export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}
export const isValidPassword = (user,password) => bcrypt.compare(password,user.password);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export class MailService{
    constructor(){
        this.client=mailer.createTransport({
            service:'gmail', port: 587, 
            auth: {
                user: 'diegopolverelli@gmail.com',
                pass: 'jvncumjsxcxemwcl'
            }
        })
    }

    async enviarMail(to, subject, html, att=[]){
        return await this.client.sendMail({
            from: 'Cursos <diegopolverelli@gmail.com>',
            to, subject, html
        })
    }

}


export default __dirname;