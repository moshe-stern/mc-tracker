import { Router } from 'express';
import bcrypt from 'bcrypt';
import { ScraperRequests } from '../../../gunther-types';
const router = Router();
router.get('scrape-orders/:userId/:type', async (req, res, next) => {
    const params: { userId: number, type: ScraperRequests } = req.params
    const { userId, type } = params
    switch (type) {
        // get store cache by user id
        case ScraperRequests.AMAZON:
            break
        case ScraperRequests.BEST_BUY:
            break
        case ScraperRequests.WALMART:
            break

    }
    //pupperteer code make fetch to store with cache
    //do scrape
    //get data and add to invoices
})