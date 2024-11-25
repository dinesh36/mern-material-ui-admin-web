export const encode = (decodedString: string) => {
  return Buffer.from(decodedString).toString('base64');
};

export const decode = (encodedString: string) => {
  return Buffer.from(encodedString, 'base64').toString('ascii');
};
