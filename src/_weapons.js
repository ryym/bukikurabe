// TODO: Replace this with a backend API.

let _id = 0;

function weapon(name, specs) {
  const [spec1, spec2, spec3] = specs;
  _id += 1;
  return {
    id: _id,
    name, spec1, spec2, spec3,
    description: `これは${name}というブキだ！`,
    image: 'images/buki-wakaba.png'
  };
}

module.exports = [
  weapon('ブキ1', [11, 20, 30]),
  weapon('ブキ2', [12, 20, 30]),
  weapon('ブキ3', [13, 20, 30]),
  weapon('ブキ4', [14, 20, 30]),
  weapon('ブキ5', [15, 20, 30]),
];
