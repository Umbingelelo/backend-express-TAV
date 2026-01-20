/**
 * Definición de Rutas
 *
 * Aquí centralizamos todas las rutas de la API.
 */

import { Router } from 'express';
import ArticleController from '../controllers/ArticleController.js';
import AuthController from '../controllers/AuthController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import OpenRouterService from '../services/OpenRouter.js';
import Article from '../models/Article.js';

const router = Router();

// Rutas de Autenticación
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/profile', authenticateToken, AuthController.getProfile);

// Rutas de Artículos (CRUD)
router.get('/articles', ArticleController.index);
router.get('/articles/:id', ArticleController.show);
router.post('/articles', ArticleController.store);
router.put('/articles/:id', ArticleController.update);
router.delete('/articles/:id', ArticleController.destroy);

/**
 * Ruta Especial: Integración con IA
 * POST /articles/:id/summarize
 * Genera un resumen del contenido del artículo usando OpenRouter.
 */
router.post('/articles/:id/summarize', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.find(id);

    if (!article) {
      return res.status(404).json({ error: 'Artículo no encontrado' });
    }

    if (!article.content) {
      return res
        .status(400)
        .json({ error: 'El artículo no tiene contenido para resumir' });
    }

    // Llamamos al servicio de IA
    const summary = await OpenRouterService.generateSummary(article.content);

    res.json({
      original_id: article.id,
      summary: summary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generando el resumen' });
  }
});

// Ruta base de prueba
router.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API Educativa con Node 24' });
});

export default router;
