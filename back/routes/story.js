import { Router } from "express";
import * as auth from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
// import admin from "../middlewares/admin.js";
import { create, getAll, edit, get, getId } from "../controllers/story.js";
// import { create, getAll, edit } from "../controllers/story.js";
const router = Router();

router.post("/", auth.jwt, upload, create);
router.get("/", get);
// router.get("/all", auth.jwt, admin, getAll);
router.get("/all", auth.jwt, getAll);
router.get("/:id", getId);
// router.patch("/:id", auth.jwt, admin, upload, edit);
router.patch("/:id", auth.jwt, upload, edit);

export default router;
