import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

// Limitar todos los métodos a 10 llamadas por segundo por conexión
DDPRateLimiter.addRule({ type: 'method', userId: () => true }, 10, 1000);

// Limitar suscripciones
DDPRateLimiter.addRule({ type: 'subscription', userId: () => true }, 5, 1000);
