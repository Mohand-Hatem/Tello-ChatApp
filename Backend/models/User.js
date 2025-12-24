import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is Required"],
      unique: [true, "This Name Already Exist"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [30, "Name must be less than 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: [true, "This Email Already Exist"],
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//Hashing Password Before Saving
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password") || !this.password) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return;
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
