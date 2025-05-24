### Summary
This PR adds an `eventsLogger.js` module that uses Node.js `EventEmitter` to handle custom events like `userLogin`, `userLogout`, and `itemPurchased`. 

### Details
- `EventsLogger` class extends `EventEmitter`.
- `registerListeners()` sets up listeners for each event type.
- `logEvent(eventName, data)` triggers the event.
- Logs are printed to the console based on user actions.

### Testing
- Simulated user actions in a test script.
- Verified console logs show correct messages for each event.

