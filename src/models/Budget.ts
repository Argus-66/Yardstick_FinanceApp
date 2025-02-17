import mongoose, { Schema, Document } from "mongoose";

export interface IBudget extends Document {
  amount: number;
  category: string;
  date: Date;
}

const BudgetSchema = new Schema<IBudget>({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.models.Budget || mongoose.model<IBudget>("Budget", BudgetSchema);
