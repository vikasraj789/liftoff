export const areAllKeysEmpty = (obj) => {
  var objCpy = JSON.parse(JSON.stringify(obj));

  for(var key in objCpy) {
    if(!objCpy[key]) {
      delete objCpy[key];
    }
  }
  return (Object.keys(objCpy).length === 0);
};
