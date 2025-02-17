import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Budget from "@/models/Budget";

export async function GET() {
  try {
    await dbConnect();
    const budgets = await Budget.find({});
    return NextResponse.json(budgets);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { amount, category, date } = await req.json();

    if (!amount || !category || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newBudget = new Budget({ amount, category, date });
    await newBudget.save();

    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create budget" }, { status: 500 });
  }
}
