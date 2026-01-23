import { NextResponse } from "next/server";
import { storeContactMessage } from "@/app/lib/db/contact";
import { createClient } from "@/app/lib/supabase/server"
import { sendContactNotification } from "@/app/lib/email/sendContactNotification";

export async function POST(req: Request) {

    const supabase = await createClient();

    try {
        const formData = await req.formData();

        const name = formData.get("name")?.toString();
        const email = formData.get("email")?.toString();
        const subject = formData.get("subject")?.toString();
        const message = formData.get("message")?.toString();

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await storeContactMessage(supabase, {
            name,
            email,
            subject,
            message,
        });
        
        try {
            await sendContactNotification({
                name,
                email,
                subject,
                message,
            });
        } catch (emailError) {
            console.log("Notification email send failed:", emailError);
        }

        return NextResponse.json(
            { success: true },
            { status: 201 }
        );
    } catch (error) {
        console.error("Contact form error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
