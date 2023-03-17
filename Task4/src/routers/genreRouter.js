import Router from './router.js';
import genreController from '../dao/genreController.js';
const router = new Router();

router.get('/genres', genreController.find);
router.post('/genres', genreController.create);
router.put('/genres', genreController.update);
router.delete('/genres', genreController.remove);

export default router;