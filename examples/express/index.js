import Express from 'express';
import shutdown from '../../index';

const app = Express();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World!!!' });
});

const server = app.listen(3000, () => {
    console.log({ message: 'Server started at http://localhost:3000' });
});

const signals = ['SIGINT', 'SIGTERM'];

const shutdownCallback = async () => {
    await server.close();
    console.log({ message: 'Server Shutdown Gracefully!!!' });
    console.log({ message: 'Gracefully shutdown successful!!!' });
};

shutdown({ signals, shutdownCallback });
