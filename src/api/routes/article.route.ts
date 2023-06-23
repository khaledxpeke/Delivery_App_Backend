import { Router, Request, Response } from 'express';
import { ArticleController } from '../controllers/article.controller';

const route: Router = Router();

route.post('/', async (req: Request, res: Response) => {
  const controller = new ArticleController();
  const result = await controller.addArticle(req.body);
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
route.get('/', async (req: Request, res: Response) => {
  const controller = new ArticleController();
  const result = await controller.getAllArticles();
  const { error, data } = result;
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(200).send(data);
});
route.get('/:id', async (req: Request, res: Response) => {
  const controller = new ArticleController();
  const result = await controller.getArticleById(req.params.id);
  res.sendStatus(result);
});
route.delete('/:id', async (req: Request, res: Response) => {
  const controller = new ArticleController();
  const result = await controller.deleteArticle(req.params.id);
  res.sendStatus(200);
});
export default route;