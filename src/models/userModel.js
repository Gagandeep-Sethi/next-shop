import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // Password is not required for Google users
    required: function () {
      return !this.googleId;
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  // Google ID and token for Google sign-in users
  googleId: String,
  googleToken: String,
});

// Add a text index for searching
userSchema.index({ username: "text", email: "text" });

// Static method for searching users
userSchema.statics.search = async function (query) {
  const users = await this.find(
    {
      $text: { $search: query },
    },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } });

  return users;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
