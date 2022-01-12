import { Router } from 'express';
import { validateAddCustomer } from '../../validators/customer.validator.js';
import { addCustomer, deleteCustomer, getCustomer, sendNotification, updateCustomer } from './customer.model.js';

const router = Router();


router.post('/add', validateAddCustomer, addCustomer);
router.post('/update', updateCustomer);

router.delete('/delete', deleteCustomer);

router.post('/send-notification', sendNotification);
router.get('/:customerId/fetch', getCustomer);

export default router