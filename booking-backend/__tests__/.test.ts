import request from 'supertest';
import { app, server } from '../server'; // Adjust the import paths as necessary

describe('Auth Endpoints', () => {

  // Test case to sign up a new user
  it('should sign up a new user and return a success message', async () => {
    const response = await request(app)
      .post('/signup')
      .send({
        username: 'testuser19',
        email: 'testuser19@gmail.com',
        password: 'password12345678',
      });

    expect(response.status).toBe(201); // Expect the status code to be 201 (Created)
    expect(response.body.message).toBe('User created successfully'); // Check that the success message is returned
  });

  // Clean up after all tests in this describe block
  afterAll((done) => {
    server.close(done); // Properly close the server after tests
  });
});
