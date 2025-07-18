import { Router } from './utils/router.js';
import { handleLogin, handleDefault, handleShops, handleSecurityQuestions, handleSecurityProfile, handleUpdateEmail, handleUpdatePassword, handleUpdateQuestions, handleActiveOrders, handleReturns, handleHistory } from './handlers/index.js';

// Initialize router
const router = new Router();

// Register routes
router.register('GET', '/', handleDefault);
router.register('POST', '/api/login', handleLogin);
router.registerDynamic('GET', '/api/{username}/shops', handleShops);
router.register('GET', '/api/security/all_questions', handleSecurityQuestions);
router.registerDynamic('GET', '/api/security/{username}/profile', handleSecurityProfile);
router.registerDynamic('PUT', '/api/security/{username}/email', handleUpdateEmail);
router.registerDynamic('PUT', '/api/security/{username}/password', handleUpdatePassword);
router.registerDynamic('PUT', '/api/security/{username}/updatequestions', handleUpdateQuestions);
router.registerDynamic('GET', '/api/{shipTono}/activeorders', handleActiveOrders);
router.registerDynamic('GET', '/api/{shipTono}/returns', handleReturns);
router.registerDynamic('POST', '/api/{shipTono}/history', handleHistory);

export default {
  async fetch(request, env, ctx) {
    return await router.handle(request);
  }
};
