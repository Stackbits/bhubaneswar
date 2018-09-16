import redis from 'redis';
import logger from './pino.logger';

// connecting to redis with config param
const redisClient = redis.createClient({
    port: 6379, // replace with your port
    host: 'localhost', // replace with your hostanme or IP address
});

redisClient.on('connect', () => {
    logger.info({ message: 'Connected to Redis!!!' });
});

redisClient.on('error', (err) => {
    logger.error({ message: `Error establishing connection with Redis-Server!!! : ${err.message}` });
});

export default redisClient;
