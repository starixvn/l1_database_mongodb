// @ts-check

/** @type { { _id: DBNamespace, fields: string[] }[] } */
const md5Configs = [];

{
    const fields = ["encryptedResultHash.iv", "encryptedResultHash.content", "encryptedResult.iv", "encryptedResult.content"];
    [
        { db: "minigame_arc", coll: "taixiu_results_bk" },
        { db: "minigame_arc", coll: "xocxoc_results_bk" },
        { db: "minigame_arc", coll: "baucua_results_bk" },
        { db: "minigame_arc", coll: "txturbo_results_bk" },
        { db: "minigame_arc", coll: "minisedie_results_bk" },
        { db: "minigame_arc", coll: "baccarat_results_bk" },
        { db: "minigame_arc", coll: "kenomax_results_bk" },
        { db: "minigame_arc", coll: "kenomax2_results_bk" },
        { db: "minigame_arc", coll: "kenomini_results_bk" },
        { db: "minigame_arc", coll: "kenomini2_results_bk" },
        { db: "minigame_arc", coll: "kenoeast_results_bk" },
        { db: "minigame_arc", coll: "kenowest_results_bk" },
        { db: "minigame_arc", coll: "kenosouth_results_bk" },
        { db: "minigame_arc", coll: "kenonorth_results_bk" },
        { db: "minigame_arc", coll: "vipsedie_results_bk" },
        { db: "minigame_arc", coll: "sicbo_results_bk" },
        { db: "minigame_arc", coll: "vipbaccarat_results_bk" },
        { db: "minigame_arc", coll: "unbalancedbigsmall1_results_bk" },
        { db: "minigame_arc", coll: "unbalancedbigsmall2_results_bk" },
        { db: "minigame_arc", coll: "megakeno_results_bk" },
        { db: "minigame_arc", coll: "megakeno2_results_bk" },
        { db: "minigame_arc", coll: "unbalancedbigsmall3_results_bk" },
        { db: "minigame_arc", coll: "unbalancedbigsmall4_results_bk" },
        { db: "minigame_arc", coll: "minisedie2_results_bk" },
        { db: "minigame_arc", coll: "minisedie3_results_bk" },
        { db: "minigame_arc", coll: "minisedie4_results_bk" },
        { db: "minigame_arc", coll: "fantan_results_bk" },
        { db: "minigame_arc", coll: "winthreecards_results_bk" },
        { db: "minigame_arc", coll: "dragontigerfight_results_bk" },
        { db: "minigame_arc", coll: "bandarqiuqiu_results_bk" },
        { db: "minigame_arc", coll: "sedie3_results_bk" },
        { db: "minigame_arc", coll: "karakrus_results_bk" },
        { db: "minigame_arc", coll: "sevenupdown_results_bk" },
    ].forEach((_id) => {
        md5Configs.push({ _id, fields });
    });
}

{
    const fields = ["finalHash", "serverSeedHash"];
    [
        { db: "minigame_arc", coll: "spaceflight_results_bk" }, //
        { db: "minigame_arc", coll: "footballdice_results_bk" },
        { db: "minigame_arc", coll: "cointoss_results_bk" },
        { db: "minigame_arc", coll: "footballcointoss_results_bk" },
    ].forEach((_id) => {
        md5Configs.push({ _id, fields });
    });
}

{
    const fields = ["shoe.encryptedShoe.iv", "shoe.encryptedShoe.content", "shoe.encryptedShoeHash.iv", "shoe.encryptedShoeHash.content"];
    [
        { db: "minigame_arc", coll: "bac81_results_bk" }, //
        { db: "minigame_arc", coll: "bac82_results_bk" },
        { db: "minigame_arc", coll: "bac83_results_bk" },
        { db: "minigame_arc", coll: "bac84_results_bk" },
        { db: "minigame_arc", coll: "bac85_results_bk" },
        { db: "minigame_arc", coll: "bac86_results_bk" },
        { db: "minigame_arc", coll: "bac87_results_bk" },
        { db: "minigame_arc", coll: "bac88_results_bk" },
        { db: "minigame_arc", coll: "bac89_results_bk" },
        { db: "minigame_arc", coll: "bac90_results_bk" },
        { db: "minigame_arc", coll: "bac91_results_bk" },
        { db: "minigame_arc", coll: "bac92_results_bk" },
        { db: "minigame_arc", coll: "bac97_results_bk" },
        { db: "minigame_arc", coll: "bac98_results_bk" },
        { db: "minigame_arc", coll: "bac100_results_bk" },
        { db: "minigame_arc", coll: "bac101_results_bk" },
    ].forEach((_id) => {
        md5Configs.push({ _id, fields });
    });
}

{
    const fields = [
        "serverSeedHash",
        "encryptedServerSeed.iv",
        "encryptedServerSeed.content",
        "encryptedFinalResult.iv",
        "encryptedFinalResult.content",
        "encryptedFinalHash.iv",
        "encryptedFinalHash.content",
    ];
    [
        { db: "minigame_arc", coll: "coinmining_results_bk" }, //
    ].forEach((_id) => {
        md5Configs.push({ _id, fields });
    });
}

{
    const fields = [
        "hash", //
        "encryptedServerSeed.iv",
        "encryptedServerSeed.content",
        "encryptedFinalResult.iv",
        "encryptedFinalResult.content",
    ];
    [
        { db: "minigame_arc", coll: "chineseblackjack_results_bk" }, //
    ].forEach((_id) => {
        md5Configs.push({ _id, fields });
    });
}

module.exports = { md5Configs };
