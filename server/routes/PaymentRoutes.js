import express from "express";
import { listHistory, listPackages, verifySession, createCheckoutSession } from "../controllers/paymentController.js";
import { requireAuth } from "../middlewares/auth.js";

const paymentRouter = express.Router()

paymentRouter.get("/packages", listPackages);
paymentRouter.post("/create-checkout-session", requireAuth, createCheckoutSession);

paymentRouter.post("/verify-session", requireAuth, verifySession);
paymentRouter.get("/history", requireAuth, listHistory);

export default paymentRouter;
