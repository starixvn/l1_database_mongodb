/** L1 L2 -- */
deploy: {
  const dbs   = DBs(db);
  const view  = 'minisedie_histories';
  const label = `minigame-${view}@${dbs.toString()}`;
  const { L, stage } = dbs._mongo._identity;
  const logger = $Log(`VIEW`);
  if (path.basename(path.resolve(`..`)) != `l${L}`) break deploy;
  if (!["active", "mixed"].includes(stage)) break deploy;

  const source = 'users';
  const agg = [
    {$project: {
      _id: 0, playerId: '$local.memberId',
    }},
    {$lookup: {
      from    : 'minisedie_cuocs',
      let     : { playerId: '$playerId' },
      pipeline: [
        {$match : {$expr: {$and: [{$eq: ['$paid', true]}, {$eq: ['$playerId', '$$playerId']}]}}},
        {$lookup: {
          from        : 'minisedie_phiens',
          localField  : 'roundId',
          foreignField: 'id',
          as          : 'round',
        }},
        {$unwind: '$round'},
        {$set   : {gameId: {$literal: 9}}},
      ],
      as      : 'minisedie',
    }},
    {$lookup: {
      from    : 'minisedie2_bets',
      let     : { playerId: '$playerId' },
      pipeline: [
        {$match : {$expr: {$and: [{$eq: ['$paid', true]}, {$eq: ['$playerId', '$$playerId']}]}}},
        {$lookup: {
          from        : 'minisedie2_rounds',
          localField  : 'roundId',
          foreignField: 'id',
          as          : 'round',
        }},
        {$unwind: '$round'},
        {$set   : {gameId: {$literal: 56}}},
      ],
      as      : 'minisedie2',
    }},
    {$lookup: {
      from    : 'minisedie3_bets',
      let     : { playerId: '$playerId' },
      pipeline: [
        {$match : {$expr: {$and: [{$eq: ['$paid', true]}, {$eq: ['$playerId', '$$playerId']}]}}},
        {$lookup: {
          from        : 'minisedie3_rounds',
          localField  : 'roundId',
          foreignField: 'id',
          as          : 'round',
        }},
        {$unwind: '$round'},
        {$set   : {gameId: {$literal: 57}}},
      ],
      as      : 'minisedie3',
    }},
    {$lookup: {
      from    : 'minisedie4_bets',
      let     : { playerId: '$playerId' },
      pipeline: [
        {$match : {$expr: {$and: [{$eq: ['$paid', true]}, {$eq: ['$playerId', '$$playerId']}]}}},
        {$lookup: {
          from        : 'minisedie4_rounds',
          localField  : 'roundId',
          foreignField: 'id',
          as          : 'round',
        }},
        {$unwind: '$round'},
        {$set   : {gameId: {$literal: 58}}},
      ],
      as      : 'minisedie4',
    }},
    {$set: {
      minisedie : '$$REMOVE',
      minisedie2: '$$REMOVE',
      minisedie3: '$$REMOVE',
      minisedie4: '$$REMOVE',
      bet: {$concatArrays: ['$minisedie', '$minisedie2', '$minisedie3', '$minisedie4']},
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
