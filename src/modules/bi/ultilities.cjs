/**
 * @param { BsonDocument | string } expression
 * @returns { BsonDocument | string }
 */
const objToJSON = (expression, maxLevel = 1, level = 0) => {
    if (level > maxLevel) return expression;
    return {
        $concat: [
            "{",
            {
                $reduce: {
                    input: { $objectToArray: expression },
                    initialValue: "",
                    in: {
                        $concat: [
                            "$$value",
                            { $cond: { if: { $eq: ["$$value", ""] }, then: "", else: "," } },
                            '"',
                            "$$this.k",
                            '":',
                            {
                                $switch: {
                                    branches: [
                                        { case: { $eq: [{ $type: "$$this.v" }, "null"] }, then: "null" },
                                        { case: { $in: [{ $type: "$$this.v" }, ["double", "bool", "int", "long", "decimal"]] }, then: { $toString: "$$this.v" } },
                                        { case: { $eq: [{ $type: "$$this.v" }, "object"] }, then: objToJSON("$$this.v", maxLevel, level + 1) },
                                        { case: { $eq: [{ $type: "$$this.v" }, "array"] }, then: arrToJSON("$$this.v", maxLevel, level + 1) },
                                    ],
                                    default: { $concat: ['"', { $toString: "$$this.v" }, '"'] },
                                },
                            },
                        ],
                    },
                },
            },
            "}",
        ],
    };
};

/**
 * @param { BsonDocument | string } expression
 * @returns { BsonDocument | string }
 */
const arrToJSON = (expression, maxLevel = 1, level = 0) => {
    if (level > maxLevel) return expression;
    return {
        $concat: [
            "[",
            {
                $reduce: {
                    input: expression,
                    initialValue: "",
                    in: {
                        $concat: [
                            "$$value",
                            { $cond: { if: { $eq: ["$$value", ""] }, then: "", else: "," } },
                            {
                                $switch: {
                                    branches: [
                                        { case: { $eq: [{ $type: "$$this" }, "null"] }, then: "null" },
                                        { case: { $in: [{ $type: "$$this" }, ["double", "bool", "int", "long", "decimal"]] }, then: { $toString: "$$this" } },
                                        { case: { $eq: [{ $type: "$$this" }, "object"] }, then: objToJSON("$$this", maxLevel, level + 1) },
                                        { case: { $eq: [{ $type: "$$this" }, "array"] }, then: arrToJSON("$$this", maxLevel, level + 1) },
                                    ],
                                    default: { $concat: ['"', { $toString: "$$this" }, '"'] },
                                },
                            },
                        ],
                    },
                },
            },
            "]",
        ],
    };
};

module.exports = { objToJSON, arrToJSON };
