import { Router } from 'express';
import { validateAddCustomer, validateSendNotification } from '../../validators/customer.validator.js';
import { addCustomer, deleteCustomer, getAllCustomers, getCustomer, sendNotification, updateCustomer } from './customer.model.js';

const router = Router();


router.post('/add', validateAddCustomer, addCustomer);
router.post('/:customerId/update', updateCustomer);

router.delete('/:customerId/delete', deleteCustomer);

router.post('/send-notification',validateSendNotification,sendNotification);
router.get('/:customerId/fetch', getCustomer);
router.get('/fetchAll', getAllCustomers);

export default router