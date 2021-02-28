import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";
class NpsController {
  /* NPS = (max notas - min notas) / (n respostas) x 100 */

  static async execute(req: Request, res: Response) {
    const { survey_id } = req.params;
    const surveysUserRepository = getCustomRepository(SurveysUserRepository);

    const surveyUsers = await surveysUserRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const min = surveyUsers.filter((survey) => {
      return survey.value >= 0 && survey.value <= 6;
    }).length;

    const max = surveyUsers.filter((survey) => {
      return survey.value >= 9 && survey.value <= 10;
    }).length;

    const totalAnswers = surveyUsers.length;
    const calculate = Number(((max - min) / totalAnswers) * 100).toFixed(2);

    return res.json({
      max,
      min,
      totalAnswers,
      nps: calculate,
    });
  }
}
export { NpsController };
