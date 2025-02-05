import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

// Sample to-do list
const todoList = [
  { id: 1, task: 'Buy groceries', completed: false },
  { id: 2, task: 'Complete project report', completed: true },
  { id: 3, task: 'Book flight tickets', completed: false },
];

// GET /sample - Retrieve the to-do list
router.get('/', (req: Request, res: Response) => {
  res.json(todoList);
});

export default router;
