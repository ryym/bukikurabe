// Delete all table data. Deletions must be done sequentially
// by this order to avoid violating foreign key constraint.
module.exports = function cleanDB(db) {
  return [
    'main_weapons',
    'sub_weapons',
    'special_weapons',
    'weapon_types',
    'meta_data',
  ]
  .map(name => `DELETE FROM ${name}`)
  .reduce(
    (p, q) => p.then(() => db.query(q)),
    Promise.resolve()
  );
};
