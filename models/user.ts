// models/User.ts
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: String,
  address: String,
  avatar: { 
    type: String, 
    default: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
  },
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
}, { timestamps: true });

// Password hashing middleware
UserSchema.pre("save", async function (next) {
  // Only hash password if it has been modified (new or changed)
  if (!this.isModified("password")) return ;

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    return;
  } catch (error: any) {
    return error;
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;