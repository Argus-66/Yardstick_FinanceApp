import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Budget from "@/models/Budget";
import { startOfMonth, endOfMonth } from "date-fns"; // ✅ Import date functions

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month"); // Get selected month (YYYY-MM)

    if (!month) {
      return NextResponse.json({ error: "Month is required" }, { status: 400 });
    }

    console.log("🟢 Fetching budgets for month:", month); // ✅ Debugging log

    // Find budgets matching the month directly
    const budgets = await Budget.find({
      month // Match the month string directly
    });

    console.log("📊 Budgets Found:", budgets); // ✅ Debugging log

    return NextResponse.json(budgets);
  } catch (error) {
    console.error("❌ Error fetching budgets:", error);
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { month, category, amount } = await req.json();

    console.log("🟢 Received Budget Data:", { month, category, amount });

    if (!month || !category || !amount) {
      console.error("❌ Missing required fields:", { month, category, amount });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Convert `month` to date for querying 
    const date = new Date(`${month}-01T00:00:00.000Z`);

    console.log("🗓 Converted Date:", date);

    // ✅ Fix Duplicate Prevention: Match only `YYYY-MM`
    const existingBudget = await Budget.findOne({
      month, // Use month directly
      category,
    });

    if (existingBudget) {
      console.log("⚠️ Budget for this category already exists:", existingBudget);
      return NextResponse.json({ error: "Budget for this category already exists" }, { status: 400 });
    }

    // ✅ Store budget using the month field
    const newBudget = new Budget({
      month, // ✅ Store month directly "YYYY-MM"
      category,
      amount,
    });

    await newBudget.save();
    console.log("✅ Budget successfully saved:", newBudget);

    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    console.error("❌ Budget creation error:", error);
    return NextResponse.json({ error: "Failed to create budget" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const { id, amount } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Budget ID is required" }, { status: 400 });
    }

    const updatedBudget = await Budget.findByIdAndUpdate(id, { amount }, { new: true });
    return NextResponse.json(updatedBudget, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update budget" }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Budget ID is required" }, { status: 400 });
    }

    await Budget.findByIdAndDelete(id);
    return NextResponse.json({ message: "Budget deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete budget" }, { status: 500 });
  }
}
