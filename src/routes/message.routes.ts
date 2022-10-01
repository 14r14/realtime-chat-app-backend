import express from "express";

const router = express.Router();

import messageControllers = require("../controllers/message.controllers");

router.get("/get-messages", messageControllers.getMessages);

export = router;