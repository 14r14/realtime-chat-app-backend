import bcrypt = require("bcrypt");

export const generateHashedPassword = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

export const checkPasswordHash = async (
  password: string,
  dbPassword: string
) => {
  return bcrypt.compare(password, dbPassword);
};
