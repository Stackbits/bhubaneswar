import mongoose from 'mongoose';
import bluebird from 'bluebird';
import shutdown from '../../index';

// Promisifing Mongoose
mongoose.Promise = bluebird.Promise;

const initializeMongo = async () => {
    await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
};

initializeMongo().catch(err => console.error({ message: `Error connecting Mongo. Message: ${err.message}` }));

mongoose.connection.once(('open'), () => {
    console.log({ message: 'Successfully connected to mongo' });
});

const signals = ['SIGINT', 'SIGTERM'];

const shutdownCallback = async () => {
    await mongoose.connection.close(false);
    console.log({ message: 'Mongo Shutdown Gracefully!!!' });
    console.log({ message: 'Gracefully shutdown successful!!!' });
};

shutdown({ signals, shutdownCallback });
