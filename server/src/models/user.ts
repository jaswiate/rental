import { Schema, model } from "mongoose";

interface User extends Document {
    _id: string;
    username: string;
    password: string;
    role: "admin" | "user";
}
// moze user powinien miec inventory rzeczy ktore wypozyczyl? alternatywnie mozna zawsze jak wchodzimy do usera robic query do rentali
const userSchema = new Schema<User>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
});

const UserModel = model<User>("User", userSchema);

export { UserModel, User };
