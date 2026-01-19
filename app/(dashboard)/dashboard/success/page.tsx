import { oswald } from "@/app/(app)/fonts";
import { fetchOrderDetails } from "../lib/paypal";
import { createClient } from "@/app/(app)/lib/supabase/server";

export default async function (){

    const supabase = await createClient();
    const userDetails = supabase.auth.getUser();

    if(!userDetails) {
        console.log("User details not found");
    }

    console.log("User details:", userDetails);

    return(
        <div className={`${oswald.className} flex flex-col justify-content align-items`}>
            <p>Success!</p>
        </div>
    );
}