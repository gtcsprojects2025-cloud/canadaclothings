// models/User.ts
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  avatar: string;
  role: "user" | "admin";
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
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
  // Password Reset Fields
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
}, { 
  timestamps: true 
});

// Password hashing middleware
UserSchema.pre("save", async function (this: IUser, next) {
  if (!this.isModified("password")) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    return;
  } catch (error: any) {
    return;
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;