import chai from 'chai'
import supertest from 'supertest'
import mongoose from 'mongoose'
import fs from 'fs'

await mongoose.connect('mongodb+srv://coderhouse:coderhouse@cluster0.v8ivmdl.mongodb.net/?retryWrites=true&w=majority&dbName=clase21')

const expect=chai.expect;
const requester=supertest('http://localhost:8080')

describe('Testing app Adoptme',()=>{

    after(async function(){
        await mongoose.connection.collection('pets').deleteMany({specie:'testing'})
    })

    describe('Test endpoints router pets',()=>{

        // ver si hacen falta before, after, etc.

        it('El endpoint POST /api/pets/ debe permitir crear una mascota',async function(){
            const petTest={
                name:'Rocky', specie:'testing', birthDate:'04-04-2020'
            }

            let {statusCode, body}=await requester.post('/api/pets').send(petTest)

            // console.log(statusCode)
            // console.log(body)
            // console.log(result)

            expect(body.payload).to.have.property('_id')
            expect(body.payload._id).exist
            expect(statusCode).to.be.equal(200)

        })

        it('El endpoint POST /api/pets/ si no recibe algún dato, debe devolver error con un status code == 400',async function(){
            const petTest={
                specie:'dog', birthDate:'04-04-2020'
            }

            let {statusCode}=await requester.post('/api/pets').send(petTest)

            // console.log(statusCode)
            // console.log(body)
            // console.log(result)

            expect(statusCode).to.be.equal(400)

        })

        it('El endpoint POST /api/pets/ debe permitir crear una mascota, y debe crear una propiedad adopted = false',async function(){
            const petTest={
                name:'Rocky', specie:'testing', birthDate:'04-04-2020'
            }

            let {body}=await requester.post('/api/pets').send(petTest)

            // console.log(statusCode)
            // console.log(body)
            // console.log(result)

            expect(body.payload).to.have.property('adopted').and.to.be.false

        })

        it('El endpoint delete /api/pets debe eliminar una mascota previamente creada',async function(){
            const petTest={
                name:'Rocky', specie:'testing', birthDate:'04-04-2020'
            }

            let {body}=await requester.post('/api/pets').send(petTest)

            let idPetCreado=body.payload._id

            let resultado=await requester.delete('/api/pets/'+idPetCreado)

            expect(resultado.body.message).to.be.equal('pet deleted')

            let {body:body2} = await requester.get('/api/pets')
            // console.log(body2)
            let mascota=body2.payload.find(m=>m._id==idPetCreado)

            expect(mascota).not.to.be.ok;
        })

    }) // fin describe pets

    describe('Probar subida de archivos',()=>{

        it('mi endpoint POST /api/pets/withimage me permita subir una foto de una mascota creada',async function(){

            const petTest={
                name:'Rocky', specie:'testing', birthDate:'04-04-2020'
            }

            let {statusCode, body}=await requester.post('/api/pets/withimage').field('name',petTest.name)
                                                                              .field('specie',petTest.specie)
                                                                              .field('birthDate',petTest.birthDate)
                                                                              .attach('image','./test/perro.png')

                                                                              

            expect(statusCode).to.be.equal(200)
            // console.log(body)

            let resultado=fs.existsSync(body.payload.image)

            expect(resultado).to.be.true
            expect(resultado).to.be.equal(true)
            expect(resultado).ok

        })
    })

})
