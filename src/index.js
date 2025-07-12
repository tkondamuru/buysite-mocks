import { Router } from './utils/router.js';
import { handleLogin, handleDefault } from './handlers/index.js';

// Initialize router
const router = new Router();

// Register routes
router.register('GET', '/', handleDefault);
router.register('POST', '/api/login', handleLogin);

export default {
  async fetch(request, env, ctx) {
    return await router.handle(request);
  }
};
