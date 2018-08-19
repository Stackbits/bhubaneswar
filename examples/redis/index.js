import redis from 'redis';
import bluebird from 'bluebird';
import shutdown from '../../index';

bluebird.promisifyAll(redis);

// connecting to redis with config param
const redisClient = redis.createClient({
    port: 6379, // replace with your port
    host: 'localhost', // replace with your hostanme or IP address
});

redisClient.on('connect', () => {
    console.log({ message: 'Connected to Redis!!!' });
});

redisClient.on('error', (err) => {
    console.error({ message: `Error establishing connection with Redis-Server!!! : ${err.message}` });
});

const signals = ['SIGINT', 'SIGTERM'];

const shutdownCallback = async () => {
    await redisClient.quit();
    console.log({ message: 'Redis Shutdown Gracefully!!!' });
    console.log({ message: 'Gracefully shutdown successful!!!' });
};

shutdown({ signals, shutdownCallback });
