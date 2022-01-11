import { Router } from 'express';
import { validateAddCustomer } from '../../validators/customer.validator.js';
import { addCustomer, deleteCustomer, getCusstomer, sendNotification, updateCustomer } from './customer.model.js';

const router = Router();


router.post('/add', validateAddCustomer, addCustomer);
router.post('/update', updateCustomer);

router.delete('/delete', deleteCustomer);

router.post('/send-notification', sendNotification);
router.get('/fetch', getCusstomer);

export default router