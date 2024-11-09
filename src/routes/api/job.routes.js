import { validatePremiumUser } from "../../middlewares/validatePremium.middelware";

const { Router } = require("express");
const { isUserAuthenticated } = require("../../middlewares/user.midddleware");
const { applyJob, revokeApplyJob, getJobsListController } = require("../../controller/job.controller");

const jobRouter = Router()

jobRouter.route('/job-list').get(isUserAuthenticated,validatePremiumUser,getJobsListController)

jobRouter.route('/apply-job').post(isUserAuthenticated,validatePremiumUser,applyJob)

jobRouter.route('/revoke-apply-job').post(isUserAuthenticated,validatePremiumUser,revokeApplyJob)

export default jobRouter