import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  month: { type: String, required: true }, // Format: "YYYY-MM"
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Budget = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
export default Budget;
