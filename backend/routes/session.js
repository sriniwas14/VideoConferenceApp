const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const User = require("../models/User");
const {
  createSession,
  addParticipant,
  validateBody,
} = require("../utils/validators");

router.post("/", validateBody(createSession), async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    const newSession = new Session({ title, description, createdBy });
    const savedSession = await newSession.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

router.post("/participants", validateBody(addParticipant), async (req, res) => {
  try {
    const { sessionId, email } = req.body;
    const session = await Session.findById(sessionId);

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    if (session.participants.length >= 10) {
      return res
        .status(400)
        .json({ success: false, message: "Session is full" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (session.participants.includes(user._id)) {
      return res
        .status(400)
        .json({ success: false, message: "User is already a participant" });
    }

    session.participants.push(user._id);
    await session.save();
    res
      .status(200)
      .json({ success: true, message: "Participant added to the session" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding participant to the session",
    });
  }
});

module.exports = router;
