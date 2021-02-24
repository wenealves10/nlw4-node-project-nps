import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveyController {
  async create(request: Request, response: Response) {
    try {
      const { title, description } = request.body;

      const surveysRepository = getCustomRepository(SurveysRepository);

      const survey = surveysRepository.create({ title, description });
      await surveysRepository.save(survey);

      return response.status(201).json(survey);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const surveysRepository = getCustomRepository(SurveysRepository);

      const allSurveys = await surveysRepository.find();

      return response.status(200).json(allSurveys);
    } catch (error) {
      return response.status(501).json({ error });
    }
  }
}

export { SurveyController };
