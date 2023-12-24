import { Router } from 'express';
import config from '../config';
import authRoutes from './auth.routes';
import docsRoutes from './docs.routes';
import mediaRoutes from './media.routes';
import userRoutes from './user.routes';

const router = Router();

interface IRoute {
  path: string;
  router: Router;
}

const defaultRoutes: IRoute[] = [
  {
    path: '/users',
    router: userRoutes
  },
  {
    path: '/auth',
    router: authRoutes
  },
  {
    path: '/media',
    router: mediaRoutes
  }
];

const devIRoute: IRoute[] = [
  {
    path: '/docs',
    router: docsRoutes
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

if (config.env === 'development') {
  devIRoute.forEach((route) => {
    router.use(route.path, route.router);
  });
}

export default router;
