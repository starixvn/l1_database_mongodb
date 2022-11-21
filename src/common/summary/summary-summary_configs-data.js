deploy: {
  const dbs   = DBs(db);
  const label = `summary-summary_configs@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;
  if (![1, 2, 3].includes(L)) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  const alias = {
    roundRef    : { [1]: `roundId`   , [2]: `roundId`   , [3]: `phien`     }[L],
    playerId    : { [1]: `playerId`  , [2]: `playerId`  , [3]: `memberId`  }[L],
    settled     : { [1]: `paid`      , [2]: `paid`      , [3]: `thanhtoan` }[L],
    refund      : { [1]: `refund`    , [2]: `refund`    , [3]: `tralai`    }[L],
    operatorId  : { [1]: `operatorId`, [2]: `operatorId`, [3]: `partnerId` }[L],
  };

  const expr = {
    noRefund    : {$literal: 0},
    isCash      : {$ifNull: [`$isCash`, `$__archive.isCash`]},
  };

  const df = {
    currency  : `$__archive.currency`,
    isCash    : { [1]: false      , [2]: true            , [3]: null          }[L],
    operatorId: { [1]: `ONEworks1`, [2]: `ONEworksVGCash`, [3]: `ONEworks_VG` }[L],
  };

  const sumConfigs = [
    { gameId  : 1,
      db      : `minigame`,
      coll    : { base: `taixiu`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId, refund: alias.refund },
      expr    : {
        stake   : { [1]: `$totalAmount`, [2]: `$totalAmount`, [3]: `$bet` }[L],
        payout  : {
          [1]: `$totalWin`, [2]: `$totalWin`,
          [3]: {$sum: [
            {$multiply: [`$betwin`, {$toInt: `$win`}]},
            {$cond: {
              if  : {$or: [{$gte: [`$big`, 0]}, {$gte: [`$small`, 0]}]},
              then: 0,
              else: {$sum: [{$multiply: [`$bet`, {$toInt: `$win`}]}, {$multiply: [`$refund`, {$toInt: {$not: `$win`}}]}]},
            }},
          ]},
        }[L],
        refund  : `$refund`,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 2,
      db      : `minigame`,
      coll    : { base: `xocxoc`, round: `phiens`, bet: `cuocs` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {
          [1]: {$multiply: [{$add: [`$even`, `$odd`, `$red3`, `$red4`, `$white3`, `$white4`, `$red2`]}, {$toInt: {$not: `$freeBet`}}]},
          [2]: {$multiply: [{$add: [`$even`, `$odd`, `$red3`, `$red4`, `$white3`, `$white4`, `$red2`]}, {$toInt: {$not: `$freeBet`}}]},
          [3]: {$multiply: [{$add: [`$even`, `$odd`, `$red3`, `$red4`, `$white3`, `$white4`         ]}, {$toInt: {$not: `$freeBet`}}]},
        }[L],
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 3,
      db      : `minigame`,
      coll    : { base: `baucua`, round: `phiens`, bet: `cuocs` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$stag`, `$gourd`, `$rooster`, `$fish`, `$crab`, `$prawn`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 4,
      db      : `minigame`,
      coll    : { base: `txturbo`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId, refund: alias.refund },
      expr    : {
        stake   : { [1]: `$totalAmount`, [2]: `$totalAmount`, [3]: `$bet` }[L],
        payout  : {
          [1]: `$totalWin`, [2]: `$totalWin`,
          [3]: {$sum: [
            {$multiply: [`$betwin`, {$toInt: `$win`}]},
            {$cond: {
              if  : {$or: [{$gte: [`$big`, 0]}, {$gte: [`$small`, 0]}]},
              then: 0,
              else: {$sum: [{$multiply: [`$bet`, {$toInt: `$win`}]}, {$multiply: [`$refund`, {$toInt: {$not: `$win`}}]}]},
            }},
          ]},
        }[L],
        refund  : `$refund`,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 5,
      db      : `minigame`,
      coll    : { base: `chanle`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId, refund: alias.refund },
      expr    : {
        stake   : { [1]: `$totalAmount`, [2]: `$totalAmount`, [3]: `$bet` }[L],
        payout  : {
          [1]: `$totalWin`, [2]: `$totalWin`,
          [3]: {$sum: [
            {$multiply: [`$betwin`, {$toInt: `$win`}]},
            {$cond: {
              if  : {$or: [{$gte: [`$even`, 0]}, {$gte: [`$odd`, 0]}]},
              then: 0,
              else: {$sum: [{$multiply: [`$bet`, {$toInt: `$win`}]}, {$multiply: [`$refund`, {$toInt: {$not: `$win`}}]}]},
            }},
          ]},
        }[L],
        refund  : `$refund`,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 6,
      db      : `minigame`,
      coll    : { base: `chanleturbo`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId, refund: alias.refund },
      expr    : {
        stake   : { [1]: `$totalAmount`, [2]: `$totalAmount`, [3]: `$bet` }[L],
        payout  : {
          [1]: `$totalWin`, [2]: `$totalWin`,
          [3]: {$sum: [
            {$multiply: [`$betwin`, {$toInt: `$win`}]},
            {$cond: {
              if  : {$or: [{$gte: [`$even`, 0]}, {$gte: [`$odd`, 0]}]},
              then: 0,
              else: {$sum: [{$multiply: [`$bet`, {$toInt: `$win`}]}, {$multiply: [`$refund`, {$toInt: {$not: `$win`}}]}]},
            }},
          ]},
        }[L],
        refund  : `$refund`,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 7,
      db      : `minigame`,
      coll    : { base: `minidragontiger`, round: `phiens`, bet: `cuocs` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$dragon`, `$tie`, `$tiger`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 8,
      db      : `minigame`,
      coll    : { base: `kenopromax`, round: `phiens`, bet: `cuocs` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 9,
      db      : `minigame`,
      coll    : { base: `minisedie`, round: `phiens`, bet: `cuocs` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$even`, `$odd`, `$red3`, `$red4`, `$white3`, `$white4`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 10,
      db      : `minigame`,
      coll    : { base: `baccarat`, round: `phiens`, bet: `cuocs` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$banker`, `$bankerPair`, `$player`, `$playerPair`, `$tie`, `$big`, `$small`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 11,
      db      : `minigame`,
      coll    : { base: `kenoproviet`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$add: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 12,
      db      : `minigame`,
      coll    : { base: `kenomax`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 13,
      db      : `minigame`,
      coll    : { base: `kenomax2`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 14,
      db      : `minigame`,
      coll    : { base: `kenomini`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 15,
      db      : `minigame`,
      coll    : { base: `kenomini2`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 16,
      db      : `minigame`,
      coll    : { base: `kenoeast`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 17,
      db      : `minigame`,
      coll    : { base: `kenowest`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 18,
      db      : `minigame`,
      coll    : { base: `kenosouth`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 19,
      db      : `minigame`,
      coll    : { base: `kenonorth`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 20,
      db      : `minigame`,
      coll    : { base: `bolatangkas`, round: `rounds` },
      alias   : { roundId: `id`, time: `startTime`, playerId: alias.playerId, settled: `settled` },
      expr    : {
        stake   : `$totalBet`,
        payout  : `$win`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 21,
      db      : `minigame`,
      coll    : { base: `roulette`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [`$totalAmount`, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 22,
      db      : `minigame`,
      coll    : { base: `vipsedie`, round: `phiens`, bet: `cuocs` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$even`, `$odd`, `$red3`, `$red4`, `$white3`, `$white4`, `$red2`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 23,
      db      : `minigame`,
      coll    : { base: `blackjack`, round: `phiens`, bet: `cuocs` },
      filter  : [ { ended: true } ],
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [`$bet`, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 24,
      db      : `minigame`,
      coll    : { base: `specialsedie`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : { [1]: `$totalAmount`, [2]: `$totalAmount`, [3]: `$amount` }[L],
        payout  : {
          [1]: `$totalWin`, [2]: `$totalWin`,
          [3]: {$sum: [
            {$multiply: [`$betwin`, {$toInt: `$win`}]},
            {$multiply: [`$amount`, {$toInt: `$win`}]},
            {$multiply: [`$refund`, {$toInt: {$not: `$win`}}]},
          ]},
        }[L],
        refund  : `$refund`,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 25,
      db      : `minigame`,
      coll    : { base: `sicbo`, round: `phiens`, bet: { [1]: `ones`, [2]: `ones`, [3]: `cuocs` }[L] },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : { [1]: `$totalAmount`, [2]: `$totalAmount`, [3]: `$totalBet` }[L],
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 26,
      db      : `minigame`,
      coll    : { base: `vipfishprawncrab`, round: `phiens`, bet: `cuocs` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$stag`, `$gourd`, `$rooster`, `$fish`, `$crab`, `$prawn`, `$mountain`, `$ocean`, `$anyTriple`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 27,
      db      : `minigame`,
      coll    : { base: `vipbaccarat`, round: `phiens`, bet: `cuocs` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$player`, `$banker`, `$tie`, `$big`, `$small`, `$playerPair`, `$bankerPair`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 28,
      db      : `minigame`,
      coll    : { base: `vipsediewar`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [`$totalAmount`, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 29,
      db      : `minigame`,
      coll    : { base: `fourguardians`, round: `rounds` },
      filter  : [ { paid: true } ],
      alias   : { roundId: `id`, time: `time`, playerId: alias.playerId, settled: `paid` },
      expr    : {
        stake   : {$sum: {$multiply: [ `$totalAmount`, {$toInt: {$not: `$freeSpin`}} ]}},
        payout  : `$betWin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 30,
      db      : `minigame`,
      coll    : { base: `fishprawncrabpro`, round: `phiens`, bet: `cuocs` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [`$totalBet`, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 31,
      db      : `minigame`,
      coll    : { base: `lottery`, round: `phiens`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [`$totalAmount`, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 32,
      db      : `minigame`,
      coll    : { base: `baccaratdiamond`, round: `phiens`, bet: `cuocs` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$banker`, `$bankerPair`, `$player`, `$playerPair`, `$tie`, `$big`, `$small`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 33,
      db      : `minigame`,
      coll    : { base: `baccaratsapphire`, round: `phiens`, bet: `cuocs` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$banker`, `$bankerPair`, `$player`, `$playerPair`, `$tie`, `$big`, `$small`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 34,
      db      : `minigame`,
      coll    : { base: `baccaratruby`, round: `phiens`, bet: `cuocs` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$banker`, `$bankerPair`, `$player`, `$playerPair`, `$tie`, `$big`, `$small`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 35,
      db      : `minigame`,
      coll    : { base: `threecards`, round: `phiens`, bet: `cuocs` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$red`, `$black`, `$diamonds`, `$hearts`, `$spades`, `$clubs`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 36,
      db      : `minigame`,
      coll    : { base: `kenomatch1`, round: `phiens`, bet: `ones` },
      filter  : [ { settled: true } ],
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [`$totalAmount`, {$toInt: {$not: `$freeBet`}}]},
        payout  : {$sum: [`$betwin`, `$refund`]},
        refund  : `$refund`,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 37,
      db      : `minigame`,
      coll    : { base: `kenomatch2`, round: `phiens`, bet: `ones` },
      filter  : [ { settled: true } ],
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [`$totalAmount`, {$toInt: {$not: `$freeBet`}}]},
        payout  : {$sum: [`$betwin`, `$refund`]},
        refund  : `$refund`,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 38,
      db      : `minigame`,
      coll    : { base: `heroesslot`, round: `rounds` },
      filter  : [ { paid: true } ],
      alias   : { roundId: `id`, time: `time`, playerId: alias.playerId, settled: `paid` },
      expr    : {
        stake   : {$sum: {$multiply: [ `$totalAmount`, {$toInt: {$not: `$freeSpin`}} ]}},
        payout  : `$betWin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 39,
      db      : `minigame`,
      coll    : { base: `casinoholdempoker`, round: `phiens`, bet: `cuocs` },
      filter  : [ { ended: true } ],
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [`$bet`, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 40,
      db      : `minigame`,
      coll    : { base: `kenopower1`, round: `phiens`, bet: `ones` },
      filter  : [ { settled: true } ],
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [`$totalAmount`, {$toInt: {$not: `$freeBet`}}]},
        payout  : {$sum: [`$betwin`, `$refund`]},
        refund  : `$refund`,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 41,
      db      : `minigame`,
      coll    : { base: `kenopower2`, round: `phiens`, bet: `ones` },
      filter  : [ { settled: true } ],
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [`$totalAmount`, {$toInt: {$not: `$freeBet`}}]},
        payout  : {$sum: [`$betwin`, `$refund`]},
        refund  : `$refund`,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 42,
      db      : `minigame`,
      coll    : { base: `texasholdempoker`, round: `phiens`, bet: `cuocs` },
      filter  : [ { ended: true } ],
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [`$bet`, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 43,
      db      : `minigame`,
      coll    : { base: `bitcoinmaster`, round: `rounds`, bet: `bets` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : `$totalAmount`,
        payout  : `$totalWin`,
        refund  : `$refund`,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 44,
      db      : `minigame`,
      coll    : { base: `paigowpoker`, round: `phiens`, bet: `cuocs` },
      filter  : [ { ended: true } ],
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [`$bet`, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 45,
      db      : `minigame`,
      coll    : { base: `hilo`, round: `rounds` },
      filter  : [ { paid: true } ],
      alias   : { roundId: `id`, time: `time`, playerId: alias.playerId, settled: `paid` },
      expr    : {
        stake   : `$amount`,
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 46,
      db      : `minigame`,
      coll    : { base: `nightclub`, round: `rounds` },
      filter  : [ { paid: true } ],
      alias   : { roundId: `id`, time: `time`, playerId: alias.playerId, settled: `paid` },
      expr    : {
        stake   : {$sum: {$multiply: [ `$totalAmount`, {$toInt: {$not: `$freeSpin`}} ]}},
        payout  : `$betWin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 47,
      db      : `minigame`,
      coll    : { base: `treasureisland`, round: `rounds` },
      filter  : [ { paid: true } ],
      alias   : { roundId: `id`, time: `time`, playerId: alias.playerId, settled: `paid` },
      expr    : {
        stake   : {$sum: {$multiply: [ `$totalAmount`, {$toInt: {$not: `$freeSpin`}} ]}},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 48,
      db      : `minigame`,
      coll    : { base: `blockchainbaccarat`, round: `rounds`, bet: `bets` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$banker`, `$bankerPair`, `$player`, `$playerPair`, `$tie`, `$big`, `$small`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 49,
      db      : `minigame`,
      coll    : { base: `waytogoal`, round: `rounds` },
      alias   : { roundId: `id`, time: `time`, playerId: alias.playerId, settled: `paid` },
      expr    : {
        stake   : {$sum: {$multiply: [ `$totalAmount`, {$toInt: {$not: `$freeSpin`}} ]}},
        payout  : `$betWin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 50,
      db      : `minigame`,
      coll    : { base: `unbalancedbigsmall1`, round: `rounds`, bet: `bets` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : `$totalAmount`,
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 51,
      db      : `minigame`,
      coll    : { base: `unbalancedbigsmall2`, round: `rounds`, bet: `bets` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : `$totalAmount`,
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 52,
      db      : `minigame`,
      coll    : { base: `megakeno`, round: `rounds`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 53,
      db      : `minigame`,
      coll    : { base: `megakeno2`, round: `rounds`, bet: `ones` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$big`, `$small`, `$even`, `$odd`, `$gold`, `$wood`, `$fire`, `$water`, `$earth`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 54,
      db      : `minigame`,
      coll    : { base: `unbalancedbigsmall3`, round: `rounds`, bet: `bets` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : `$totalAmount`,
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 55,
      db      : `minigame`,
      coll    : { base: `unbalancedbigsmall4`, round: `rounds`, bet: `bets` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : `$totalAmount`,
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 56,
      db      : `minigame`,
      coll    : { base: `minisedie2`, round: `rounds`, bet: `bets` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$even`, `$odd`, `$red3`, `$red4`, `$white3`, `$white4`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 57,
      db      : `minigame`,
      coll    : { base: `minisedie3`, round: `rounds`, bet: `bets` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$even`, `$odd`, `$red3`, `$red4`, `$white3`, `$white4`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 58,
      db      : `minigame`,
      coll    : { base: `minisedie4`, round: `rounds`, bet: `bets` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : {$multiply: [{$add: [`$even`, `$odd`, `$red3`, `$red4`, `$white3`, `$white4`]}, {$toInt: {$not: `$freeBet`}}]},
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 59,
      db      : `minigame`,
      coll    : { base: `fruitslot`, round: `rounds`, bet: `bets` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : `$totalAmount`,
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 60,
      db      : `minigame`,
      coll    : { base: `fantan`, round: `rounds`, bet: `bets` },
      alias   : { roundId: `id`, roundRef: alias.roundRef, time: `time`, playerId: alias.playerId, settled: alias.settled, operatorId: alias.operatorId },
      expr    : {
        stake   : `$totalAmount`,
        payout  : `$betwin`,
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },

    { gameId  : 99,
      db      : `minigame`,
      coll    : { base: `jackpot` },
      alias   : { roundId: `hitAt`, time: `hitTime`, playerId: `winnerId`, settled: `winnerId` },
      expr    : {
        stake   : {$literal: 0},
        payout  : {$multiply: [`$amount`, `$winningRatio`]},
        refund  : expr.noRefund,
        isCash  : {$ifNull: [expr.isCash, {$literal: df.isCash}],}
      },
      default : {
        currency  : df.currency,
        operatorId: df.operatorId,
      },
    },
  ];

  (global.___data = global.___data ?? {})[label] = [
    ...sumConfigs,
  ];
}
