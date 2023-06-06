import chai from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose';

await mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase21')

const expect=chai.expect;
const requester=supertest('http://localhost:8080')

describe('Testing Adoptme', ()=>{
    describe('Test de mascotas',()=>{
        it('El endpoint POST /api/pets debe crear una mascota', async()=>{
            const pet={
                name:'Rocky',
                specie:'perro',
                birthDate:"10-10-2022"
            }
            const {
                statusCode,
                ok, 
                _body
            } = await requester.post('/api/pets').send(pet)
            // console.log({statusCode, ok, _body})
            expect(_body.payload).to.have.property('_id')
            expect(_body.payload._id).exist
            expect(statusCode).to.be.eq(200)
        })

        it('El endpoint POST /api/pets debe crear una mascota, con un campo adopted en false', async()=>{
            const pet={
                name:'Rocky',
                specie:'perro',
                birthDate:"10-10-2022"
            }
            const {
                statusCode,
                ok, 
                _body
            } = await requester.post('/api/pets').send(pet)
            // console.log({statusCode, ok, _body})
            expect(_body.payload).to.have.property('adopted')
            expect(_body.payload.adopted).to.be.equal(false)
        })

        it('El endpoint POST /api/pets al creal una mascota sin nombre, debe devolver status 400', async()=>{
            const pet={
                specie:'perro',
                birthDate:"10-10-2022"
            }
            const {
                statusCode,
                ok, 
                _body
            } = await requester.post('/api/pets').send(pet)
            // console.log({statusCode, ok, _body})
            expect(statusCode).to.be.equal(400)
        })


        it('El endpoint GET /api/pets devuelve statusCode y payload; el payload debe ser un array', async()=>{
            const {
                statusCode,
                ok, 
                _body
            } = await requester.get('/api/pets')
            // console.log({statusCode, ok, _body})
            expect(statusCode).to.be.equal(200)
            expect(_body.payload).to.be.ok
            expect(Array.isArray(_body.payload)).to.be.equal(true)
        })

        it('El endpoint PUT /api/pets debe actualizar una mascota', async()=>{
            let pet={
                name: 'Rocky',
                specie:'perro',
                birthDate:"10-10-2022"
            }
            let {
                statusCode,
                ok, 
                _body
            } = await requester.post('/api/pets').send(pet)

            let result = await requester.get('/api/pets')
            // console.log(result)
            // console.log(result._body.payload)

            let mascota=result._body.payload.find(m=>m._id==_body.payload._id)

            // console.log(mascota.name)

            result=await requester.put('/api/pets/'+mascota._id).send({name:'Chirola'})
            // console.log(result)

            result = await requester.get('/api/pets')
            let mascota2=result._body.payload.find(m=>m._id==_body.payload._id)

            // console.log(mascota._id, mascota2._id, mascota.name, mascota2.name)

            expect(mascota2.name).not.to.be.equal(mascota.name)

        })

        it('El endpoint DELETE /api/pets debe borrar una mascota', async()=>{
            let pet={
                name: 'Rocky',
                specie:'perro',
                birthDate:"10-10-2022"
            }
            let {
                statusCode,
                ok, 
                _body
            } = await requester.post('/api/pets').send(pet)

            expect(_body.payload).to.have.property('_id')

            let result=await requester.delete('/api/pets/'+_body.payload._id)

            result = await requester.get('/api/pets')
            let mascota=result._body.payload.findIndex(m=>m._id==_body.payload._id)

            expect(mascota).to.be.equal(-1)

        })
    }) // fin describe test Adoptme

    describe('Test avanzado', ()=>{
        before(async function(){
            try {
                await mongoose.connection.collection('users').deleteMany({email:'diegolopez@test.com'});
                console.log('usuario eliminado')

                await mongoose.connection.collection('users').drop();
                console.log('coleccion users eliminada')

            } catch (error) {
                console.log('No existía usuario', error)
            }
        })

        let cookie;
        let cookie2;

        it('Debe registrar a un usuario correctamente', async function(){
            const user={
                first_name:"Diego",
                last_name:"Lopez",
                email:"diegolopez@test.com",
                password:"123"
            }
            const {_body}= await requester.post('/api/sessions/register').send(user);

            expect(_body.payload).to.be.ok;
        })

        it('Debe loguear bien y crear una cookie',async function(){
            const user={
                email:'diegolopez@test.com',
                password:'123'
            }

            const result=await requester.post('/api/sessions/login').send(user);
            const cookieResult=result.headers['set-cookie'][0]
            // console.log(cookieResult)
            expect(cookieResult).to.be.ok;

            cookie={
                name:cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }

            cookie2=result.headers['set-cookie'];

            expect(cookie.name).to.be.ok.and.equal('coderCookie');
            expect(cookie.value).to.be.ok;
        })

        it("Debe enviar cookie con usuario y destructurarlo luego correctamente", async function(){
            const {_body} = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])

            expect(_body.payload.email).to.be.equal('diegolopez@test.com')
        })


        it('Recibe y lee la cookie generada', async () => {
            const response = await requester
              .get('/api/sessions/current')
              .set('Cookie', cookie2) // Usa la cookie generada en la solicitud

              console.log(cookie2)

              console.log(response.body, response._body)
              console.log(response.body === response._body)

              expect(response._body.payload.email).to.be.equal('diegolopez@test.com')

              
            // Realiza las aserciones necesarias sobre la respuesta del segundo endpoint
          });

        it('Cualquier banana... 2 + 2 es 4',()=>{
            expect(2+2).to.be.equal(4);
        })

        it('Debe loguear bien y crear una cookie (unprotectedCookie)',async function(){
            const user={
                email:'diegolopez@test.com',
                password:'123'
            }

            const result=await requester.get('/api/sessions/unprotectedLogin').send(user);
            console.log(result._body, result.statusCode)
            const cookieResult=result.headers['set-cookie'][0]
            // console.log(cookieResult)
            expect(cookieResult).to.be.ok;

            cookie={
                name:cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }

            expect(cookie.name).to.be.ok.and.equal('unprotectedCookie');
            expect(cookie.value).to.be.ok;
        })

        it("Get a unprotectedCurrent: Debe enviar cookie con usuario y destructurarlo luego correctamente", async function(){
            const {_body} = await requester.get('/api/sessions/unprotectedCurrent').set('Cookie', [`${cookie.name}=${cookie.value}`])

            expect(_body.payload.email).to.be.equal('diegolopez@test.com')
            expect(_body.payload.first_name).to.be.equal('Diego')
            expect(_body.payload.last_name).to.be.equal('Lopez')

        })

    }) // fin describe Test avanzado

    describe('Test upload',()=>{
        it("Debe crearse mascota con ruta de la imagen", async()=>{
            const pet={
                name:"Lassie",specie:"perro",
                birthDate:"10-10-2019"
            }
            const result=await requester.post('/api/pets/withimage')
                                .field('name',pet.name)
                                .field('specie',pet.specie)
                                .field('birthDate', pet.birthDate)
                                .attach('image','./test/perro.PNG')

            expect(result.status).to.be.equal(200)
            expect(result._body.payload).to.have.property('_id')
            expect(result._body.payload.image).to.be.ok;

        })
    })

})