/** L1 L2 -- */
deploy: {
  const dbs   = DBs(db);
  const view  = 'megabigsmall_histories';
  const label = `minigame-${view}@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;
  const logger = $Log(`VIEW`);
  if (path.basename(path.resolve(`..`)) != `l${L}`) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  const source = 'users';
  const agg = [
    {$project: {
      _id: 0, playerId: 1, operatorId: 1,
    }},
    {$lookup: {
      from    : 'unbalancedbigsmall1_bets',
      let     : { playerId: '$playerId', operatorId: '$operatorId' },
      pipeline: [
        {$match : {$expr: {$and: [{$eq: ['$paid', true]}, {$eq: ['$playerId', '$$playerId']}, {$eq: ['$operatorId', '$$operatorId']}]}}},
        {$lookup: {
          from    : 'unbalancedbigsmall1_betlogs',
          let     : { roundId: '$roundId', playerId: '$playerId', operatorId: '$operatorId' },
          pipeline: [
            {$match: {$expr: {$and: [{$eq: ['$roundId', '$$roundId']}, {$eq: ['$playerId', '$$playerId']}, {$eq: ['$operatorId', '$$operatorId']}]}}},
          ],
          as      : 'betLogs',
        }},
        {$lookup: {
          from        : 'unbalancedbigsmall1_rounds',
          localField  : 'roundId',
          foreignField: 'id',
          as          : 'round',
        }},
        {$unwind: '$round'},
        {$set   : {gameId: {$literal: 50}}},
      ],
      as      : 'lasvegas',
    }},
    {$lookup: {
      from    : 'unbalancedbigsmall2_bets',
      let     : { playerId: '$playerId', operatorId: '$operatorId' },
      pipeline: [
        {$match : {$expr: {$and: [{$eq: ['$paid', true]}, {$eq: ['$playerId', '$$playerId']}, {$eq: ['$operatorId', '$$operatorId']}]}}},
        {$lookup: {
          from    : 'unbalancedbigsmall2_betlogs',
          let     : { roundId: '$roundId', playerId: '$playerId', operatorId: '$operatorId' },
          pipeline: [
            {$match: {$expr: {$and: [{$eq: ['$roundId', '$$roundId']}, {$eq: ['$playerId', '$$playerId']}, {$eq: ['$operatorId', '$$operatorId']}]}}},
          ],
          as      : 'betLogs',
        }},
        {$lookup: {
          from        : 'unbalancedbigsmall2_rounds',
          localField  : 'roundId',
          foreignField: 'id',
          as          : 'round',
        }},
        {$unwind: '$round'},
        {$set   : {gameId: {$literal: 51}}},
      ],
      as      : 'marinabay',
    }},
    {$lookup: {
      from    : 'unbalancedbigsmall3_bets',
      let     : { playerId: '$playerId', operatorId: '$operatorId' },
      pipeline: [
        {$match : {$expr: {$and: [{$eq: ['$paid', true]}, {$eq: ['$playerId', '$$playerId']}, {$eq: ['$operatorId', '$$operatorId']}]}}},
        {$lookup: {
          from    : 'unbalancedbigsmall3_betlogs',
          let     : { roundId: '$roundId', playerId: '$playerId', operatorId: '$operatorId' },
          pipeline: [
            {$match: {$expr: {$and: [{$eq: ['$roundId', '$$roundId']}, {$eq: ['$playerId', '$$playerId']}, {$eq: ['$operatorId', '$$operatorId']}]}}},
          ],
          as      : 'betLogs',
        }},
        {$lookup: {
          from        : 'unbalancedbigsmall3_rounds',
          localField  : 'roundId',
          foreignField: 'id',
          as          : 'round',
        }},
        {$unwind: '$round'},
        {$set   : {gameId: {$literal: 54}}},
      ],
      as      : 'macau',
    }},
    {$lookup: {
      from    : 'unbalancedbigsmall4_bets',
      let     : { playerId: '$playerId', operatorId: '$operatorId' },
      pipeline: [
        {$match : {$expr: {$and: [{$eq: ['$paid', true]}, {$eq: ['$playerId', '$$playerId']}, {$eq: ['$operatorId', '$$operatorId']}]}}},
        {$lookup: {
          from    : 'unbalancedbigsmall4_betlogs',
          let     : { roundId: '$roundId', playerId: '$playerId', operatorId: '$operatorId' },
          pipeline: [
            {$match: {$expr: {$and: [{$eq: ['$roundId', '$$roundId']}, {$eq: ['$playerId', '$$playerId']}, {$eq: ['$operatorId', '$$operatorId']}]}}},
          ],
          as      : 'betLogs',
        }},
        {$lookup: {
          from        : 'unbalancedbigsmall4_rounds',
          localField  : 'roundId',
          foreignField: 'id',
          as          : 'round',
        }},
        {$unwind: '$round'},
        {$set   : {gameId: {$literal: 55}}},
      ],
      as      : 'montecarlo',
    }},
    {$set: {
      lasvegas  : '$$REMOVE',
      marinabay : '$$REMOVE',
      macau     : '$$REMOVE',
      montecarlo: '$$REMOVE',
      bet: {$concatArrays: ['$lasvegas', '$marinabay', '$macau', '$montecarlo']},
    }},
    {$unwind: '$bet'},
  ];


  let status = dbs.minigame.getCollection(view).exists();
  if (!status) {
    logger.warn(label, `View does not exist. Creating...`);
    dbs.minigame.createView(view, '_', []);
    status = dbs.minigame.getCollection(view).exists();
  }
  if (status.type !== 'view') {
    logger.err(label, `Target is not a view. Abort...`);
    break deploy;
  }

  const result = dbs.minigame.runCommand({ collMod: view, viewOn: source, pipeline: agg });
  logger.info(label, `Successfully created view`);
}
