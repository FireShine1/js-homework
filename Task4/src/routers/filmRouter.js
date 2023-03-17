import Router from './router.js';
import filmController from '../dao/filmController.js';
const router = new Router();

router.get('/films', filmController.find);
router.post('/films', filmController.create);
router.put('/films', filmController.update);
router.delete('/films', filmController.remove);

export default router;