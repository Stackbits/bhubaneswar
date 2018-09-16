import Express from 'express';
import mongoose from './mongo.config';
import redisClient from './redis.config';
import logger from './pino.logger';
import shutdown from '../../index';

const app = Express();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!!!' });
});

const server = app.listen(3000, () => {
    logger.info({ message: 'Server started at http://localhost:3000' });
});

const signals = ['SIGINT', 'SIGTERM', 'SIGUSR2'];

const shutdownCallback = async () => {
    await redisClient.quit();
    logger.info({ message: 'Redis Shutdown Gracefully!!!' });
    await mongoose.connection.close(false);
    logger.info({ message: 'Mongo Shutdown Gracefully!!!' });
    await server.close();
    logger.info({ message: 'Server Shutdown Gracefully!!!' });
    logger.info({ message: 'Gracefully shutdown successful!!!' });
};

shutdown({ signals, shutdownCallback });

export default server;
