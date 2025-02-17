import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  amount: number;
  date: Date;
  description?: string; 
  category: string;
  type: "expense" | "income"; // ✅ Now supports Income & Expense
}

const TransactionSchema = new Schema<ITransaction>({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  category: { type: String, required: true },
  type: { type: String, enum: ["expense", "income"], required: true }, // ✅ Income & Expense supported
});

export default mongoose.models.Transaction || mongoose.model<ITransaction>("Transaction", TransactionSchema);
