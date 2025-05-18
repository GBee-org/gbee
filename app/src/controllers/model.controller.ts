import { Request, Response, NextFunction } from "express";
import { Controller, Route } from "../decorators";
import { modelService } from "../services";
import { Model } from "../models";

@Controller('/models')
export class ModelsController {
  @Route('get', '/get/all')
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await modelService.getAll();
      return res.status(200).json(users);
    } catch (error) {
      logging.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
      return res.status(500).json({ message: errorMessage });
    }
  }

  @Route('get', '/get/:id')
  async getById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as any as number;
    try {
      const model = await modelService.getById(id);
      if (!model) return res.status(404).json({ message: 'Not Found' });
      return res.status(200).json(model);
    } catch (error) {
      logging.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
      return res.status(500).json({ message: errorMessage });
    }
  }

  @Route('post', '/create')
  async create(req: Request, res: Response) {
    const newModels = req.body as Model[];
    try {
      const modelsCreated = await modelService.create(newModels);
      if (!modelsCreated || modelsCreated instanceof Error) 
        return res.status(400).json({ message: 'Models creation failed' });
      return res.status(200).json(modelsCreated);
    } catch (error) {
      logging.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
      res.status(500).json({ message: errorMessage });
    }
  }

  @Route('get', '/query')
  async getByQuery(req: Request, res: Response, next: NextFunction) {
    try {
      const models = await modelService.getByQuery(req.query);
      if (!models) return res.status(404).json({ message: 'Not Found' });
      return res.status(200).json(models);
    } catch (error) {
      logging.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
      return res.status(500).json({ message: errorMessage });
    }
  }

  @Route('patch', '/update/:id')
  async update(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as any as number;
    try {
      const model = await modelService.update(id, req.body);
      if (!model) return res.status(404).json({ message: 'Not Found' });
      return res.status(200).json(model);
    } catch (error) {
      logging.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
      return res.status(500).json({ message: errorMessage });
    }
  }

  @Route('delete', '/delete/:id')
  async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as any as number;
    try {
      const isDeleted = await modelService.remove(id);
      if (!isDeleted) return res.status(404).json({ message: 'Not Found' });
      return res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      logging.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
      return res.status(500).json({ message: errorMessage });
    }
  }
}
