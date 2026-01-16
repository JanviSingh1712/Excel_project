import User from "../models/User.js";

export const getUsers = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Access denied" });

  const users = await User.find();

  res.json(users);
};
