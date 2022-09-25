import jwt = require("jsonwebtoken");

export const generateSecretKey = async (id: string): Promise<string | undefined> => {
  const payload = {
    data: id,
  };
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      String(process.env.TOKEN_SECRET),
      {
        expiresIn: "1hr",
      },
      function (err, tokenVal) {
        if (err) reject(err);
        else resolve(tokenVal);
      }
    );
  });
};
