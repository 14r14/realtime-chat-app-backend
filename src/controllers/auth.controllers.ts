import User from "../models/user.model";

// TYPES
import { UserStructure } from "../models/user.model";
import { Request, Response } from "express";
import {
  ClientLoginData,
  ClientRegisterData,
  ServerToClientError,
  AuthSuccessfullToClient,
} from "../interfaces/auth.interface";
import {
  checkPasswordHash,
  generateHashedPassword,
} from "../helpers/passHashMethods";
import { generateSecretKey } from "../helpers/jwtTokenMethods";
import { validationResult } from "express-validator";

const postLoginController = async (req: Request, res: Response) => {
  const { email, password } = <ClientLoginData>req.body;

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.json(<ServerToClientError>{
      success: false,
      code: "validationerror",
      msg: validationErrors.array()[0],
    });
  }

  const existingUserCheck: UserStructure | null | undefined =
    await User.findOne({
      email,
    });

  if (!existingUserCheck)
    return res.json(<ServerToClientError>{
      success: false,
      code: "usernotfound",
    });

  const isPasswordCorrect = await checkPasswordHash(
    password,
    existingUserCheck.password
  );

  if (!isPasswordCorrect)
    return res.json(<ServerToClientError>{
      success: false,
      code: "invdata",
    });

  const accessToken = await generateSecretKey(existingUserCheck._id.toString());

  return res
    .cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60,
      signed: true,
      httpOnly: true,
    })
    .json(<AuthSuccessfullToClient>{
      success: true,
      username: existingUserCheck.username,
      active: existingUserCheck.active,
    });
};

const postRegisterController = async (req: Request, res: Response) => {
  const { username, email, password } = <ClientRegisterData>req.body;

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.json(<ServerToClientError>{
      success: false,
      code: "validationerror",
      msg: validationErrors.array()[0],
    });
  }

  const existingUserCheck: UserStructure | null | undefined =
    await User.findOne({
      email,
    });
  if (existingUserCheck)
    return res.json(<ServerToClientError>{
      success: false,
      code: "useralrexists",
    });

  const hashedPassword = await generateHashedPassword(password);

  const newlyCreatedUser = await User.create({
    username,
    email,
    password: hashedPassword,
    status: "online",
  });

  await newlyCreatedUser.save();

  const accessToken = await generateSecretKey(newlyCreatedUser._id.toString());

  return res
    .cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60,
      signed: true,
      httpOnly: true,
    })
    .json(<AuthSuccessfullToClient>{
      success: true,
      username: newlyCreatedUser.username,
      active: newlyCreatedUser.active,
    });
};

export { postLoginController, postRegisterController };
