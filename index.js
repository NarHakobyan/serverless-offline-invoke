class OfflinePlugin {
    constructor(serverless, options) {
        if (options.stage === 'offline') {
            const handlers = Object.values(serverless.variables.service.functions);

            handlers.forEach((item) => {
                if (!item.events) {
                    item.events = [];
                }

                for (const event of item.events) {
                    if(event.hasOwnProperty('http')) {
                        return;
                    }
                }
                item.events.push({ http: `post ${item.handler.split('.')[1]}` } );
            });
        }

        console.warn('Running in offline mode');
    }
}

module.exports = OfflinePlugin;
