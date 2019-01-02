function test() {
  const givers = ['dylan', 'brenna', 'stephen'];
  const recs = ['brenna', 0, 'stephen'];
  const arr = givers.filter((person, index) => {
    return !recs[index];
  });
  console.log(arr);
}

module.exports = test;