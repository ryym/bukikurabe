import cleanDB from '../../../scripts/lib/clean-db';

// Clean DB after each test.
export function setupDBCleaner(test, db) {
  test.afterEach.always('Clean up DB', () => {
    return cleanDB(db);
  });
}
