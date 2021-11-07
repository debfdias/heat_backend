import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { MessageController } from "./controllers/MessageController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);
router.post("/messages", ensureAuthenticated, new MessageController().create);
router.get("/messages/last3", new MessageController().last3);
router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export { router };
