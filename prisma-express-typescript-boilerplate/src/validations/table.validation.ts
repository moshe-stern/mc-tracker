import Joi from 'joi';

const table = {
  body: Joi.object().keys({
    headerColumns: Joi.array<string[]>().required(),
    userId: Joi.number().required()
  })
};

const tableItem = {
  body: Joi.object().keys({
    tableId: Joi.number().required(),
    values: Joi.object().required()
  })
};

export default {
  table,
  tableItem
};
