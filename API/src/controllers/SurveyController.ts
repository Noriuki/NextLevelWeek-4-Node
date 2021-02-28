import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveyRepository } from "../repositories/SurveyRepository";

class SurveyController {
  /* create */
  static async create(req: Request, res: Response) {
    const { title, description } = req.body;

    const surveyRepository = getCustomRepository(SurveyRepository);

    const survey = surveyRepository.create({
      title,
      description,
    });

    const surveyExists = await surveyRepository.findOne({
      title,
    });

    if (surveyExists) {
      throw new AppError("Survey already exists!");
    }

    await surveyRepository.save(survey);

    return res.status(201).json(survey);
  }

  /* get all */
  static async show(req: Request, res: Response) {
    const surveyRepository = getCustomRepository(SurveyRepository);

    const allSurveys = await surveyRepository.find();
    return res.status(200).json({
      success: true,
      allSurveys,
    });
  }
}

export { SurveyController };
