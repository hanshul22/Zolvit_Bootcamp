const fs = require('fs');

const dummyNotes = `
Meeting with Team - Monday 10 AM
- Discuss project roadmap
- Assign sprint tasks
- Review last week's progress

Shopping List
- Milk
- Bread
- Eggs
- Coffee

Ideas for Portfolio Project
- Fitness Tracker App
- Real-time Chat App
- Budget Planner

Quote of the Day:
"Success is not final, failure is not fatal: It is the courage to continue that counts." – Winston Churchill
`;

// Write to notes.txt
fs.writeFileSync('notes.txt', dummyNotes.trim());

// Read from notes.txt
const data = fs.readFileSync('notes.txt', 'utf8');

// Print content to console
console.log('File content:\n', data);
