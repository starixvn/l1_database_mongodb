/** L1 L2 -- */
deploy: {
  const dbs   = DBs(db);
  const view  = 'megakeno_histories';
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
      from    : 'megakeno_ones',
      let     : { playerId: '$playerId' },
      pipeline: [
        {$match : {$expr: {$eq: ['$playerId', '$$playerId']}}},
        {$lookup: {
          from    : 'megakeno_bets',
          let     : { roundId: '$roundId' ,playerId: '$playerId' },
          pipeline: [
            {$match: {$expr: {$and: [{$eq: ['$roundId', '$$roundId']}, {$eq: ['$playerId', '$$playerId']}]}}},
          ],
          as      : 'betLogs',
        }},
        {$set   : {gameId: {$literal: 52}}},
      ],
      as      : 'megakeno',
    }},
    {$lookup: {
      from    : 'megakeno2_ones',
      let     : { playerId: '$playerId' },
      pipeline: [
        {$match : {$expr: {$eq: ['$playerId', '$$playerId']}}},
        {$lookup: {
          from    : 'megakeno2_bets',
          let     : { roundId: '$roundId' ,playerId: '$playerId' },
          pipeline: [
            {$match: {$expr: {$and: [{$eq: ['$roundId', '$$roundId']}, {$eq: ['$playerId', '$$playerId']}]}}},
          ],
          as      : 'betLogs',
        }},
        {$set: {gameId: {$literal: 53}}},
      ],
      as      : 'megakeno2',
    }},
    {$lookup: {
      from    : 'kenomini_ones',
      let     : { playerId: '$playerId' },
      pipeline: [
        {$match: {$expr: {$eq: ['$playerId', '$$playerId']}}},
        {$lookup: {
          from    : 'kenomini_cuocs',
          let     : { roundId: '$roundId' ,playerId: '$playerId' },
          pipeline: [
            {$match : {$expr: {$and: [{$eq: ['$roundId', '$$roundId']}, {$eq: ['$playerId', '$$playerId']}]}}},
          ],
          as      : 'betLogs',
        }},
        {$set: {gameId: {$literal: 14}}},
      ],
      as      : 'kenomini',
    }},
    {$lookup: {
      from    : 'kenomini2_ones',
      let     : { playerId: '$playerId' },
      pipeline: [
        {$match : {$expr: {$eq: ['$playerId', '$$playerId']}}},
        {$lookup: {
          from    : 'kenomini2_cuocs',
          let     : { roundId: '$roundId' ,playerId: '$playerId' },
          pipeline: [
            {$match : {$expr: {$and: [{$eq: ['$roundId', '$$roundId']}, {$eq: ['$playerId', '$$playerId']}]}}},
          ],
          as      : 'betLogs',
        }},
        {$set   : {gameId: {$literal: 15}}},
      ],
      as      : 'kenomini2',
    }},
    {$lookup: {
      from    : 'kenoeast_ones',
      let     : { playerId: '$playerId' },
      pipeline: [
        {$match : {$expr: {$eq: ['$playerId', '$$playerId']}}},
        {$lookup: {
          from    : 'kenoeast_cuocs',
          let     : { roundId: '$roundId' ,playerId: '$playerId' },
          pipeline: [
            {$match : {$expr: {$and: [{$eq: ['$roundId', '$$roundId']}, {$eq: ['$playerId', '$$playerId']}]}}},
          ],
          as      : 'betLogs',
        }},
        {$set   : {gameId: {$literal: 16}}},
      ],
      as      : 'kenoeast',
    }},
    {$lookup: {
      from    : 'kenowest_ones',
      let     : { playerId: '$playerId' },
      pipeline: [
        {$match : {$expr: {$eq: ['$playerId', '$$playerId']}}},
        {$lookup: {
          from    : 'kenowest_cuocs',
          let     : { roundId: '$roundId' ,playerId: '$playerId' },
          pipeline: [
            {$match : {$expr: {$and: [{$eq: ['$roundId', '$$roundId']}, {$eq: ['$playerId', '$$playerId']}]}}},
          ],
          as      : 'betLogs',
        }},
        {$set   : {gameId: {$literal: 17}}},
      ],
      as      : 'kenowest',
    }},
    {$lookup: {
      from    : 'kenosouth_ones',
      let     : { playerId: '$playerId' },
      pipeline: [
        {$match : {$expr: {$eq: ['$playerId', '$$playerId']}}},
        {$lookup: {
          from    : 'kenosouth_cuocs',
          let     : { roundId: '$roundId' ,playerId: '$playerId' },
          pipeline: [
            {$match : {$expr: {$and: [{$eq: ['$roundId', '$$roundId']}, {$eq: ['$playerId', '$$playerId']}]}}},
          ],
          as      : 'betLogs',
        }},
        {$set   : {gameId: {$literal: 18}}},
      ],
      as      : 'kenosouth',
    }},
    {$lookup: {
      from    : 'kenonorth_ones',
      let     : { playerId: '$playerId' },
      pipeline: [
        {$match : {$expr: {$eq: ['$playerId', '$$playerId']}}},
        {$lookup: {
          from    : 'kenonorth_cuocs',
          let     : { roundId: '$roundId' ,playerId: '$playerId' },
          pipeline: [
            {$match : {$expr: {$and: [{$eq: ['$roundId', '$$roundId']}, {$eq: ['$playerId', '$$playerId']}]}}},
          ],
          as      : 'betLogs',
        }},
        {$set   : {gameId: {$literal: 19}}},
      ],
      as      : 'kenonorth',
    }},
    {$set: {
      megakeno : '$$REMOVE',
      megakeno2: '$$REMOVE',
      kenomini : '$$REMOVE',
      kenomini2: '$$REMOVE',
      kenoeast : '$$REMOVE',
      kenowest : '$$REMOVE',
      kenosouth: '$$REMOVE',
      kenonorth: '$$REMOVE',
      bet: {$concatArrays: ['$megakeno', '$megakeno2', '$kenomini', '$kenomini2', '$kenoeast', '$kenowest', '$kenosouth', '$kenonorth']},
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

  dbs.minigame.runCommand({ collMod: view, viewOn: source, pipeline: agg });
}
