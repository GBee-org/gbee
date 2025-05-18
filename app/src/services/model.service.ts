import { TypeORM } from '../decorators';
import { Model } from '../models';

async function getAll() {
  try {
    const models = await TypeORM.GetAll('models');
    return models;
  } catch (error) {
    logging.error(error);
    new Error(
      'Error while getting all {{models}}' +
        { message: error instanceof Error ? error.message : 'Unexpected error' }
    );
  }
}

async function getById(id: number) {
  try {
    const model = await TypeORM.GetById('models', id);
    if (!model) return null;
    return model;
  } catch (error) {
    logging.error(error);
    new Error(
      'Error while getting {{models}} by id' +
        { message: error instanceof Error ? error.message : 'Unexpected error' }
    );
  }
}

async function create(models: Model[]) {
  try {
    // TODO: Add your validation logic here
    const modelCreated = await TypeORM.Create('models', models);
    return modelCreated;
  } catch (error) {
    logging.error(error);
    new Error(
      `Error while creating {{user}} with model=${models}` +
        { message: error instanceof Error ? error.message : 'Unexpected error' }
    );
  }
}

async function getByQuery(queryParams: any) {
  try {
    let models = await TypeORM.Query('models', queryParams);
    if (models?.length === 0 || models === null) return [];
    return models;
  } catch (error) {
    logging.error(error);
    new Error(
      `Error while getting {{model}} by query=${queryParams}` +
        { message: error instanceof Error ? error.message : 'Unexpected error' }
    );
  }
}

async function update(id: number, updatedData: Model) {
  try {
    const model = await TypeORM.Update('models', id, updatedData);
    return model;
  } catch (error) {
    logging.error(error);
    new Error(
      'Error while updating {{model}}' +
        { message: error instanceof Error ? error.message : 'Unexpected error' }
    );
  }
}

async function remove(id: number) {
  try {
    const isDeleted = await TypeORM.Delete('models', id);
    return isDeleted;
  } catch (error) {
    logging.error(error);
    new Error(
      'Error while deleting {{model}}' +
        { message: error instanceof Error ? error.message : 'Unexpected error' }
    );
  }
}

export const modelService = {
  getAll,
  getById,
  create,
  getByQuery,
  update,
  remove
};
