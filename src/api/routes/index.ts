import { Router } from 'express';
import main from './main.route';
import user from './user.route';
import depot from './depot.route';
import order from './order.route';
import article from './article.route';
import vehicule from './vehicule.route';
import history from './history.route';
import livraison from './livraison.route';
const router: Router = Router();
router.use('/', main);
router.use('/user', user);
router.use('/depot', depot);
router.use('/order', order);
router.use('/article', article);
router.use('/vehicule', vehicule);
router.use('/history', history);
router.use('/livraison', livraison);


export default router;