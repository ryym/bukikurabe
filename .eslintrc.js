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

    // In Redux reducers, it is convenient to use block statements for
    // each case clause. So indent them to make them more readable.
    "indent": [2, 2, {
      "SwitchCase": 1
    }]
  }
}

