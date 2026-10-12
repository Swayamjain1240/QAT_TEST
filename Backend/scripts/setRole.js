import dns from "dns"
import dotenv from "dotenv"
dotenv.config();
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import mongoose from "mongoose";
import User from "../models/userModel.js"

const setRole = async () => {
  try {
    const email = process.argv[2];
    const role = process.argv[3];

    
    if (!email || !role) {
      console.log(
        "Usage: node scripts/setRole.js <email> <role>"
      );
      process.exit(1);
    }

    
    const allowedRoles = ["user", "manager", "admin"];

    if (!allowedRoles.includes(role)) {
      console.log("Invalid role!");
      console.log("Allowed roles: user, manager, admin");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected successfully");

    const user = await User.findOne({
      email: email.trim().toLowerCase()
    });

    if (!user) {
      console.log("User not found!");
      return;
    }

    user.role = role;
    await user.save();

    console.log("User role updated successfully!");
    console.log(`Email: ${user.email}`);
    console.log(`New Role: ${user.role}`);

  } catch (error) {
    console.error("Error:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

setRole();
