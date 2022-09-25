import express from 'express';

import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const users = [];

router.get('/', (req, res) => {
  return res.json(users);
});

router.post('/', (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  return res.send(
    `User with the username ${user.firstName} added to the database!`
  );
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  return res.json(foundUser);
});

export default router;
