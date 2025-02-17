import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function GET() {
  try {
    await dbConnect();
    const transactions = await Transaction.find({}).sort({ date: -1 });

    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { amount, date, description, category, type } = await req.json();

    if (!amount || !date || !category || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const timestamp = new Date(date).toISOString(); // ✅ Store full timestamp
    const newTransaction = new Transaction({ amount, date: timestamp, description, category, type });
    await newTransaction.save();

    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
    try {
      await dbConnect();
      const { id } = await req.json();
  
      if (!id) {
        return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
      }
  
      await Transaction.findByIdAndDelete(id);
      return NextResponse.json({ message: "Transaction deleted successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
    }
  }
  

  export async function PUT(req: Request) {
    try {
      await dbConnect();
      const { id, amount, description, category, type, date } = await req.json();
  
      if (!id) {
        return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
      }
  
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        id,
        { 
          amount, 
          description, 
          category, 
          type, 
          date: new Date(date).toISOString() // ✅ Ensure date is stored correctly
        },
        { new: true }
      );
  
      if (!updatedTransaction) {
        return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
      }
  
      return NextResponse.json(updatedTransaction, { status: 200 });
    } catch (error) {
      console.error("Error updating transaction:", error);
      return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
    }
  }