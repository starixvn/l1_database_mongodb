// @ts-check
const biColumnType = /** @type {const} */ ({
    oid: { mongo_type: `bson.ObjectId`, sql_type: `objectid` },
    str: { mongo_type: `string`, sql_type: `varchar` },
    float: { mongo_type: `float64`, sql_type: `float` },
    int: { mongo_type: `int`, sql_type: `int` },
    int64: { mongo_type: `int64`, sql_type: `int` },
    bool: { mongo_type: `bool`, sql_type: `boolean` },
    date: { mongo_type: `date`, sql_type: `timestamp` },
    filter: { mongo_type: `mongo.Filter`, sql_type: `varchar` },
});

module.exports = biColumnType;
