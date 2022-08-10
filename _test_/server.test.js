'use strict';
const { app } = require('../Banana/src/server.js');
const { db } = require('../Banana/src/db.js');
const supertest = require('supertest');
const mockRequest = supertest(app);
const jwt = require('jsonwebtoken');
const { user } = require('../Banana/src/models/users/models.js');
// add authorization header in supertest

beforeAll(async () => {
  const response = await supertest(app).get('/authentication/test');
  token = response.body.token;
  process.env.SECRET = 'testing';
  await db.sync();
  //sign up
  await mockRequest.post('/signup').send({username: "Zayah", password: 'pogchamp', role: 'admin'});
  //sign in
  // await mockRequest.post('/signin').send({username: "Zayahs Last Punch", password: 'pogchamp'}).set('Authorization', `Bearer ${token}`); // add auth header 
  // token verification?
  
});
afterAll(async () => {
  await db.drop();
});

describe('web server', () => {
  // const token = jwt.sign({ username: 'Justin', password: "password", role: 'admin' }, 'testing');
  // console.log(token);
  //   it('should respond with a 404 on an invalid route', () => {
  //     return mockRequest.get('/foobar').then((results) => {
  //       expect(results.status).toBe(404);
  //     });
  //   });

  //   it('should respond with a 404 on an invalid method', async () => {
  //         const response = await mockRequest.put('/notes');
  //         expect(response.status).toBe(404);
  // });

  xit('can create a record', async () => {
    const note = { author: "Justin", content: "test note", private: false };
    // console.log(mockRequest.post);
    const response = await mockRequest.post('/notes').send(note);

    expect(response.status).toBe(200);
    expect(response.body.content).toEqual("test note");
    expect(response.body.author).toEqual("Justin");
  });

  xit('can get list of records', async () => {
    const response = await mockRequest.get('/notes');
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);

  });

  xit('can get a record', async () => {
    const response = await mockRequest.get('/notes/1');
    expect(response.status).toBe(200);
    expect(typeof response.body).toEqual('object');
    expect(response.body.id).toEqual(1);
  });

  xit('can update a record', async () => {
    const response = await mockRequest.get('/notes/1');
    expect(response.status).toBe(200);
    expect(response.body.id).toEqual(1);
  });

  it('can delete a record', async () => {
    let response = await mockRequest.post('/signin').auth(user.username, user.password);
    // let token = response.body.user.token;
    console.log('-------->', response.body);
    console.log('-------->', response.body.user)
    let tempID = await mockRequest.delete('/notes').auth(token, {type: 'bearer'});
    if(user.role === 'user'){
      expect(tempID.status).toBe(500);
    }


    // const response = await mockRequest.delete('/notes/1').auth('Authorization', `Bearer ${token}`);
    // expect(response.status).toBe(200);
    // const getResponse = await mockRequest.get('/notes');
    // expect(getResponse.body.length).toEqual(0);
  });
});


// test('can delete if admin', async (done) => {
//   let response = await mockRequest.post('/signin').auth(dads[dadType].username, dads[dadType].password);
//   // var token
//   let token = response.body.user.token;

//   let jokeID = await mockRequest.delete('/jokes/1').auth(token, { type: 'bearer' });        

//   if(dads[dadType].role === 'user' || dads[dadType].role === 'editor') {
//     expect(jokeID.status).toBe(500);
//   } else {
//     expect(jokeID.status).toBe(200);
//     expect(jokeID.body.id).toBeUndefined();
//   }
//   done();
// })

// 9:21 PM | Today
// Charlie Fadness (TA)

// let dads = {
// user: {
// username: 'user', password: 'user', role: 'user'
// },
// editor: {
// username: 'editor', password: 'editor', role: 'editor'
// },
// admin: {
// username: 'admin', password: 'admin', role: 'admin'
// }
// }

// 9:29 PM | Today 
