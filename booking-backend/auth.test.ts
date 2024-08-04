import request from 'supertest'
import app from '../booking-backend/server'

describe ('Auth Endpoints', ()=>{
    it('should sing up a new user', async ()=>{
        const response = await request(app)
        .post('/signup')
        .send({
            username: 'testuser',
            email: 'testuser123@gmail.com',
            password: 'password123'
        })

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();

    })
})