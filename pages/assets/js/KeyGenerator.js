export const keyGenerator = (len) => {
  const p = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return [...Array(len)].reduce((a) => a + p[~~(Math.random() * p.length)], "");
};
