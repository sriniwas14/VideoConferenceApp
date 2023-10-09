const { ObjectId } = require("mongodb");
const { mixed, object, string, bool } = require("yup");

// User
let createUser = object({
  name: string().min(1).max(50).required(),
  phone: string().min(10).max(15).required(),
  email: string().email().required(),
  password: string().min(8).required(),
  userType: mixed().oneOf(["teacher", "student"]),
});

let loginUser = object({
  email: string().email().required(),
  password: string().min(8).required(),
});

// Session

let createSession = object({
  title: string().min(10).max(75).required(),
  description: string().min(20).max(150).required(),
  createdBy: mixed((value) => ObjectId.isValid(value)),
});

let addParticipant = object({
  sessionId: mixed((value) => ObjectId.isValid(value)),
  email: string().email(),
});

const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
};

module.exports = {
  validateBody,
  createUser,
  loginUser,
  createSession,
  addParticipant,
};
