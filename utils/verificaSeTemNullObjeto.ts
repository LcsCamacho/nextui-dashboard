
export const verificaSeTemDadoNullObjeto = (data:Object) => {
  let isValid = true;
  Object.values(data).forEach((value) => {
    if (!isValid) return;
    isValid = !!value;
  });
  return isValid;
};