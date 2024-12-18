import cors from 'cors';
import routes from './router/index.js';
import express, { Request, Response } from 'express';

const app = express();

app.use(cors({
  origin: "*",
}))
app.use(express.json());
app.use(routes);

app.get("/api",
  (req: Request, res: Response) => {
    res.send("Welcome to Gnest App");
});

export default app;