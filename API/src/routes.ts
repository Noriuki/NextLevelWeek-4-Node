import { Router } from "express";
import { SendMailControler } from "./controllers/SendMailController";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";
import { AnswerController } from "./controllers/AnswerController";
import { NpsController } from "./controllers/NpsController";

const router = Router();
/* user routes */
router.post("/user", UserController.create);
/* survey routes */
router.post("/survey", SurveyController.create);
router.get("/survey", SurveyController.show);
/* surveysUser routes */
router.post("/sendMail", SendMailControler.execute);
/* answer routes */
router.get("/answers/:value", AnswerController.execute);
/* nps routes */
router.get("/nps/:survey_id", NpsController.execute);
export { router };
