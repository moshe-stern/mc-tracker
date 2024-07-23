import Joi from 'joi';

const queryTables = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  }),
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

const createTable = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    headerColumns: Joi.array<string>().required(),
    name: Joi.string().required()
  })
};

const updateTable = {
  params: Joi.object().keys({
    tableId: Joi.number().integer()
  }),
  body: Joi.object().keys({
    headerColumns: Joi.array<string>().required(),
    name: Joi.string().required()
  })
};

const deleteTables = {
  body: Joi.object().keys({
    tableId: Joi.array<number>().required()
  })
};

export default {
  queryTables,
  deleteTables,
  updateTable,
  createTable
};
