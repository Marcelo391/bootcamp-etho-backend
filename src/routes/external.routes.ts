import { Router } from 'express';
import * as movieFetcher from '../external/movieFetcher';

const extRouter = Router();

extRouter.get('/external', movieFetcher.movieFetcher);

export { extRouter }