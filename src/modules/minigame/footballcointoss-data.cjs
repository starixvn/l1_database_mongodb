/** @type { AnyBulkWriteOperation[] } */
const updateMatches = [
    {
        updateOne: {
            filter: { startTime: new Date("2024-07-01T16:00:00Z") },
            update: { $set: { home: "FRA", away: "BEL" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-07-01T19:00:00Z") },
            update: { $set: { home: "POR", away: "SVN" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-07-02T16:00:00Z") },
            update: { $set: { home: "ROU", away: "NED" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-07-02T19:00:00Z") },
            update: { $set: { home: "AUT", away: "TUR" } },
            upsert: true,
        },
    },
    // PROD
    {
        updateOne: {
            filter: { startTime: new Date("2024-07-05T16:00:00Z") },
            update: { $set: { home: "ESP", away: "GER" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-07-05T19:00:00Z") },
            update: { $set: { home: "POR", away: "FRA" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-07-06T16:00:00Z") },
            update: { $set: { home: "ENG", away: "SUI" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-07-06T19:00:00Z") },
            update: { $set: { home: "NED", away: "TUR" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-07-09T19:00:00Z") },
            update: { $set: { home: "ESP", away: "FRA" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-07-10T19:00:00Z") },
            update: { $set: { home: "NED", away: "ENG" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-07-14T19:00:00Z") },
            update: { $set: { home: "ESP", away: "ENG" } },
            upsert: true,
        },
    },
];

module.exports = { updateMatches };
