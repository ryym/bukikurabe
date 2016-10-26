module.exports = {
  "extends": "ryym/base-react",

  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },

  "plugins": [
    "react"
  ],

  "rules": {

    // Allow Redux action creators to be named like 'FETCH_USERS'.
    "new-cap": [2, {
      "capIsNewExceptionPattern": "([A-Z]+_)+[A-Z]+"
    }],

    // Indent case clauses to use block statements for each case
    // (to declare block level variables inside them).
    "indent": [2, 2, {
      "SwitchCase": 1
    }]
  }
}

