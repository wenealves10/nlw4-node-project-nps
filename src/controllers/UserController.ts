import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import * as yup from "yup";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../repositories/UsersRepository";

class UserController {
  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    const schema = yup.object().shape({
      name: yup
        .string()
        .min(4, "Minimum length 4 characters")
        .max(255, "Maximum length of 255 characters")
        .required("Name is required"),
      email: yup.string().email("Invalid email").required("E-mail is required"),
    });

    try {
      await schema.validate(request.body, {
        abortEarly: false,
      });
    } catch (error) {
      throw new AppError(error);
    }

    const userRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    const user = userRepository.create({
      name,
      email,
    });

    await userRepository.save(user);

    return response.status(201).json({ user });
  }
}

export { UserController };
