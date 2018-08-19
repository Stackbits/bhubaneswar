import http from 'http';
import shutdown from '../../index';

const server = http.createServer((req, res) => {
    res.write('Hello World!!!');
    res.end();
}).listen(3000);

const signals = ['SIGINT', 'SIGTERM'];

const shutdownCallback = async () => {
    await server.close();
    console.log({ message: 'Server Shutdown Gracefully!!!' });
    console.log({ message: 'Gracefully shutdown successful!!!' });
};

shutdown({ signals, shutdownCallback });
