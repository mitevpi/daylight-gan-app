module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ["prettier"],
  extends: [
    "plugin:vue/recommended",
    "airbnb-base",
    "plugin:prettier/recommended",
    "eslint:recommended"
  ],
  rules: {
    "vue/require-v-for-key": "warn",
    "no-param-reassign": "off",
    "no-console": "off",
    "prettier/prettier": "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/require-default-prop": "off",
    "vue/html-closing-bracket-spacing": "off",
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 7,
        multiline: {
          max: 7,
          allowFirstLine: true
        }
      }
    ]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
