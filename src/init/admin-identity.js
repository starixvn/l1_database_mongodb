{
  const id = $Collection(dbs.admin.identity, { capped: true, size: 256, max: 1 });
  id.create(); id.validate();
}
