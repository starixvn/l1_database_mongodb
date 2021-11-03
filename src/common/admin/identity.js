{
  const coll = `identity`;
  const logger = $Log(coll);
  if (dbs.admin.getCollectionInfos({name: coll}).length == 0) try {
    dbs.admin.createCollection(coll, {capped: true, size: 1, max: 1});
    logger.info(`Success`, `Collection created.`);
  } catch (e) {
    logger.err(`Failure`, e);
  }
}
