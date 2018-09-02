import mongoose from 'mongoose';
import bluebird from 'bluebird';
import logger from './pino.logger';

// Promisifing Mongoose
mongoose.Promise = bluebird.Promise;

const initializeMongo = async () => {
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
};

initializeMongo().catch(err => logger.error({ message: `Error connecting Mongo. Message: ${err.message}` }));

mongoose.connection.once(('open'), () => {
    logger.info({ message: 'Successfully connected to mongo' });
});

export default mongoose;
