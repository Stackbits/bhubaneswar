const shutdown = (shutdownConfig) => {
    const { signals, shutdownCallback } = shutdownConfig;
    signals.forEach((signal) => {
        process.on(signal, shutdownCallback);
    });
};

export default shutdown;
