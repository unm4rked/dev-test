import express, { Request, Response } from 'express';

interface Item {
  id: number;
  name: string;
  price: number;
}

const app = express();
const PORT = 3000;

app.use(express.json());

let items: Item[] = [];
let idCounter = 1;

// Create
app.post('/items', (req: Request, res: Response) => {
  const { name, price } = req.body;
  
  if (!name || !price) {
    return res.status(400).send('Name and price are required');
  }

  const newItem: Item = { id: idCounter++, name, price };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read all
app.get('/items', (req: Request, res: Response) => {
  res.json(items);
});

// Read one
app.get('/items/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = items.find(i => i.id === id);
  
  if (!item) {
    return res.status(404).send('Item not found');
  }
  
  res.json(item);
});

// Update
app.put('/items/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, price } = req.body;
  const item = items.find(i => i.id === id);
  
  if (!item) {
    return res.status(404).send('Item not found');
  }
  
  item.name = name || item.name;
  item.price = price || item.price;
  res.json(item);
});

// Delete
app.delete('/items/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = items.findIndex(i => i.id === id);
  
  if (index === -1) {
    return res.status(404).send('Item not found');
  }
  
  items.splice(index, 1);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});
