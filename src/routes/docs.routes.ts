import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from '../docs';

const router = express.Router();

export const specs = swaggerJSDoc({
  swaggerDefinition,
  apis: ['src/routes/*.ts', 'packages/components.yaml']
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true
  })
);

export default router;
