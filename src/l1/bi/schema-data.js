(async () => {
    const { getIdentity } = require("../../modules/db.cjs");
    const { log, stringifyResult } = require("../../modules/utils.cjs");

    const { L, stage } = await getIdentity(db);
    if (path.basename(path.resolve("..")) !== `l${L}`) return;
    if (!["active", "mixed"].includes(stage)) return;

    const { summariesTables } = require("../../modules/bi/schemas/summaries.cjs");
    const { bizMetadataTables } = require("../../modules/bi/schemas/biz-metadata.cjs");
    const { promotionTables } = require("../../modules/bi/schemas/promotions.cjs");

    const name = `L${L}-BI`;
    const schema = ObjectId(Buffer.from(`L${L}-BI-sch-v3`).toString("hex"));

    const biDB = db.getSiblingDB("bi");
    {
        /** @type { AnyBulkWriteOperation[] } */
        const actions = [];
        /** @param { BsonDocument } doc */
        const addToActions = ({ _id, ...data }) =>
            actions.push({
                updateOne: {
                    filter: { _id: { schema, ..._id } },
                    update: { $set: data },
                    upsert: true,
                },
            });

        summariesTables.forEach(addToActions);
        bizMetadataTables.forEach(addToActions);
        promotionTables.forEach(addToActions);

        const res = await biDB.getCollection("schema_tables").bulkWrite(actions, { ordered: false });
        log("I", "DATA", `[${biDB.getName()}.schema_tables]`, `• ${stringifyResult(res)}`);
    }
    {
        const res = await biDB.getCollection("names").bulkWrite(
            [
                {
                    updateOne: {
                        filter: /** @type { BsonDocument } */ ({ _id: name }),
                        update: { $set: { schema_id: schema } },
                        upsert: true,
                    },
                },
            ],
            { ordered: false },
        );
        log("I", "DATA", `[${biDB.getName()}.names]`, `• ${stringifyResult(res)}`);
    }
})();
