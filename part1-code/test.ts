import request from 'supertest';
import express, { Express } from 'express';
import { Server } from 'http';
import app from './app';

describe('Items API', () => {
  let server: Server;
  let testApp: Express;

  beforeAll(() => {
    testApp = express();
    testApp.use(express.json());
    server = app.listen(3001);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    app.locals.items = [];
    app.locals.idCounter = 1;
  });

  describe('POST /items', () => {
    it('should create a new item', async () => {
      const newItem = { name: 'Test Item', price: 10.99 };
      const response = await request(server).post('/items').send(newItem);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newItem.name);
      expect(response.body.price).toBe(newItem.price);
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(server).post('/items').send({ price: 10.99 });
      expect(response.status).toBe(400);
    });
  });

  describe('GET /items', () => {
    it('should return all items', async () => {
      app.locals.items = [
        { id: 1, name: 'Item 1', price: 10 },
        { id: 2, name: 'Item 2', price: 20 }
      ];
      const response = await request(server).get('/items');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });

  describe('GET /items/:id', () => {
    it('should return a specific item', async () => {
      app.locals.items = [{ id: 1, name: 'Item 1', price: 10 }];
      const response = await request(server).get('/items/1');
      expect(response.body.name).toBe('Item 1');
    });

    it('should return 404 for missing item', async () => {
      const response = await request(server).get('/items/999');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /items/:id', () => {
    it('should update an item', async () => {
      app.locals.items = [{ id: 1, name: 'Item 1', price: 10 }];
      const response = await request(server)
        .put('/items/1')
        .send({ name: 'Updated', price: 20 });
      expect(response.body.name).toBe('Updated');
      expect(response.body.price).toBe(20);
    });
  });

  describe('DELETE /items/:id', () => {
    it('should delete an item', async () => {
      app.locals.items = [{ id: 1, name: 'Item 1', price: 10 }];
      const response = await request(server).delete('/items/1');
      expect(response.status).toBe(204);
      expect(app.locals.items.length).toBe(0);
    });
  });
});
