module.exports = {
  "env": {
    "browser": true
  },

  "rules": {

    // Allow Redux action creators to be named like 'FETCH_USERS'.
    "new-cap": [2, {
      "capIsNewExceptionPattern": "([A-Z]+_)+[A-Z]+"
    }],
  }
}
