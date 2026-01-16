import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const formData = await req.formData();

    const service = formData.get("service") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const details = formData.get("details") as string;
    const links = formData.get("links") as string | null;
    const amount = formData.get("amount")
      ? Number(formData.get("amount"))
      : null;
    const unit = formData.get("unit") as string | null;

    if (!service || !name || !email || !details) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1️⃣ Insert order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        service,
        name,
        email,
        details,
        links,
        amount,
        unit,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error(orderError);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // 2️⃣ Handle file uploads
    const files = formData.getAll("files[]") as File[];

    for (const file of files) {
      // 🔒 Server-side size guard (10MB)
      if (file.size > 10 * 1024 * 1024) {
        continue;
      }

      const fileExt = file.name.split(".").pop();
      const filePath = `orders/${order.id}/${randomUUID()}.${fileExt}`;

      const buffer = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from("order-files")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error(uploadError);
        continue;
      }

      await supabase.from("order_files").insert({
        order_id: order.id,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        mime_type: file.type,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
