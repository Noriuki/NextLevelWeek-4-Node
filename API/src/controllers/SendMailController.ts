import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { UserRepository } from "../repositories/UserRepository";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";
import SendMailService from "../services/SendMailService";
import { resolve } from "path";
import { AppError } from "../errors/AppError";

class SendMailControler {
  static async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveyRepository = getCustomRepository(SurveyRepository);
    const surveysUserRepository = getCustomRepository(SurveysUserRepository);

    /* get user and survey */
    const user = await userRepository.findOne({
      email,
    });
    const survey = await surveyRepository.findOne({
      id: survey_id,
    });
    /* check if found user/survey */
    if (!user || !survey) throw new AppError("User or Survey does not exists!");

    /* enviar email para o usuario */
    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

    const surveyUserExists = await surveysUserRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ["user", "survey"],
    });

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: `${process.env.API_URL}/answers`,
    };

    /* se já existir envia o email e retorna o surveyUser */
    if (surveyUserExists) {
      variables.id = surveyUserExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return res.json(surveyUserExists);
    }

    await SendMailService.execute(email, survey.title, variables, npsPath);

    /* salvar as informações na tabela */
    const surveyUser = surveysUserRepository.create({
      user_id: user.id,
      survey_id,
    });

    variables.id = surveyUser.id;
    await surveysUserRepository.save(surveyUser);
    return res.status(201).json({
      success: true,
      surveyUser: surveyUser,
    });
  }
}

export { SendMailControler };
