import { Request, Response, Router } from 'express';

const router = Router();

router.get(
    "/api/users",
    (_req: any, res: any) => {
      return res.send(
          [
            {id: 1, username: "John Doe", email: "john@example.com"}
          ]
      );
    }
  );


export default router;