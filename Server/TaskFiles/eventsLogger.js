// eventsLogger.js

const EventEmitter = require('events');

class EventsLogger extends EventEmitter {
    constructor() {
        super();
    }

    logEvent(eventName, data) {
        this.emit(eventName, data);
    }

    registerListeners() {
        this.on('userLogin', (username) => {
            console.log(`[LOGIN] User ${username} has logged in.`);
        });

        this.on('userLogout', (username) => {
            console.log(`[LOGOUT] User ${username} has logged out.`);
        });

        this.on('itemPurchased', (info) => {
            console.log(`[PURCHASE] User ${info.username} purchased item: ${info.itemName}`);
        });
    }
}

module.exports = new EventsLogger();
