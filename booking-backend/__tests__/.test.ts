import request from 'supertest'
import {app, server} from '../server'
import type { Config } from 'jest';


// describe('Auth Endpoints', () => {
//     afterAll((done) => {
//       server.close(done); // Properly close the server after tests
//     });
// })

describe ('Auth Endpoints', ()=>{
    it('should sing up a new user', async ()=>{
        const response = await request(app)
        .post('/signup')
        .send({
            username: 'testuser6',
            email: 'testuser6@gmail.com',
            password: 'password123'
        })

        expect(response.status).toBe(201);

    })
})


