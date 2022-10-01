import jwt = require("jsonwebtoken");

import User, { UserStructure } from "../models/user.model";

export const generateSecretKey = async (
  id: string
): Promise<string | undefined> => {
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

export const checkJWT = async (
  token: string
): Promise<UserStructure | undefined> => {
  // check the jwt token
  // then return the user id
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      String(process.env.TOKEN_SECRET),
      function (err, decoded) {
        if (err) reject(err);
        else {
          const { data } = <jwt.JwtPayload>decoded;
          User.findById(data).then((user) => {
            if (user)
              resolve(user);
            else reject("user not found");
          });
        }
      }
    );
  });
};
