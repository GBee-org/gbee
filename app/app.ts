import express, { Request, Response } from 'express';
import routes from './router/index.js';

const app = express();

app.use(express.json());
app.use(routes);

app.get("/",
  (req: Request, res: Response) => {
    res.send("Welcome to Gnest App");
});

export default app;