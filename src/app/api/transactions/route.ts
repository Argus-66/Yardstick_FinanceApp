import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/mongodb";
import Transaction from "../../../models/Transaction";
import { NextRequest } from "next/server";

export async function GET() {
    try {
        await dbConnect(); // Ensure DB connection before querying
        const transactions = await Transaction.find({});
        return NextResponse.json(transactions);
    } catch (error) {
        console.error("❌ Failed to fetch transactions:", error);
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect(); // Ensure DB connection before inserting data
        const body = await req.json(); // Fix: TypeScript expects direct parsing
        const { amount, date, description, category } = body;

        if (!amount || !date || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newTransaction = new Transaction({ amount, date, description, category });
        await newTransaction.save();

        return NextResponse.json(newTransaction, { status: 201 });
    } catch (error) {
        console.error("❌ Failed to create transaction:", error);
        return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
    }
}
