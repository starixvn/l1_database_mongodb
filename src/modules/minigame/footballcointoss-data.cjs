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

    {
        updateOne: {
            filter: { startTime: new Date("2024-09-29T15:30:00Z") },
            update: { $set: { home: "MU", away: "TOT" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-10-20T15:30:00Z") },
            update: { $set: { home: "LIV", away: "CHE" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-10-27T16:30:00Z") },
            update: { $set: { home: "ARS", away: "LIV" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-11-03T16:30:00Z") },
            update: { $set: { home: "MU", away: "CHE" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-11-10T16:30:00Z") },
            update: { $set: { home: "CHE", away: "ARS" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-11-23T17:30:00Z") },
            update: { $set: { home: "MC", away: "TOT" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-12-01T16:00:00Z") },
            update: { $set: { home: "LIV", away: "MC" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-12-03T19:45:00Z") },
            update: { $set: { home: "ARS", away: "MU" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-12-15T16:30:00Z") },
            update: { $set: { home: "MC", away: "MU" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2025-02-01T15:00:00Z") },
            update: { $set: { home: "MC", away: "ARS" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-11-27T20:00:00Z") },
            update: { $set: { home: "LIV", away: "REAL" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-10-27T14:15:00Z") },
            update: { $set: { home: "REAL", away: "BARCA" } },
            upsert: true,
        },
    },
    {
        updateOne: {
            filter: { startTime: new Date("2024-10-05T15:30:00Z") },
            update: { $set: { home: "MC", away: "REAL" } },
            upsert: true,
        },
    },
];

module.exports = { updateMatches };
