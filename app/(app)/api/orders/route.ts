import { NextResponse } from "next/server";
import { createClient } from "@/app/(app)/lib/supabase/server";
import { storeOrder } from "@/app/(app)/lib/db/orders";
import { sendOrderNotification } from "@/app/(app)/lib/email/sendOrderNotification";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const formData = await req.formData();

    const service = formData.get("service")?.toString();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const details = formData.get("details")?.toString();

    if (!service || !name || !email || !details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Handle files
    const files: { filename: string; content: Buffer }[] = [];
    const uploadedFiles = formData.getAll("files[]") as File[];

    for (const file of uploadedFiles) {
      const arrayBuffer = await file.arrayBuffer();
      files.push({
        filename: file.name,
        content: Buffer.from(arrayBuffer),
      });
    }

    // Store filenames in DB
    const dbRecord = await storeOrder(supabase, {
      service,
      name,
      email,
      details,
      files: files.map(f => f.filename),
    });

    // Send email with attachments
    await sendOrderNotification({
      service,
      name,
      email,
      details,
      files,
    });

    return NextResponse.json({ success: true, order: dbRecord }, { status: 201 });
  } catch (error: any) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit order. Please try again later." },
      { status: 500 }
    );
  }
}
