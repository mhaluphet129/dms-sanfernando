export default (arr) => {
  // _name, _lastname, _username and _email flags
  const label = ["name", "lastname", "username", "email"];
  const txt = "Updated the ";
  let temp = [];
  if (arr.length > 0) {
    arr.forEach((el, i) => {
      if (el) temp.push(txt + label[i] + ".");
    });
  }

  return temp;
};
