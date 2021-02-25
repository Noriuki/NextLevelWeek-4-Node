import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

export default class UserController {
  static async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({
        error: "user already exists!",
      });
    }

    const user = userRepository.create({
      name,
      email,
    });

    await userRepository.save(user);

    return res.json(user);
  }
}
