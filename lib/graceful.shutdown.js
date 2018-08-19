const shutdown = (shutdownConfig) => {
    const { signals } = shutdownConfig;
    const { shutdownCallback } = shutdownConfig;
    signals.forEach((signal) => {
        process.on(signal, shutdownCallback);
    });
};

export default shutdown;
