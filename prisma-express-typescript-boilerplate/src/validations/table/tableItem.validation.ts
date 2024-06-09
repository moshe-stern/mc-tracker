import { Prisma } from '@prisma/client';
import Joi from 'joi';

const queryTableItems = {
    query: Joi.object().keys({
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    }),
    params: Joi.object().keys({
        tableId: Joi.number().integer()
    }),
};

const createTableItems = {
    params: {
        items: [{
            tableId: Joi.number(),
            values: Joi.object()
        }]
    }
};


const updateTableItem = {
    body: Joi.object().keys({
        tableItemId: Joi.number(),
        updateBody: Joi.object<Prisma.TableItemUpdateInput>()
    })

};

const deleteTableItems = {
    body: Joi.object().keys({
        tableItemIds: Joi.array<number>().required()
    })
};

export default {
    queryTableItems,
    deleteTableItems,
    updateTableItem,
    createTableItems
};
