"use server"

import { Supabase } from "@/lib/supabaseClient";

export async function submitMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const attachment = formData.get("attachment") as File | null;

  try {
    let attachmentURL = "";

    // Upload attachment to Supabase storage
    if (attachment && attachment.size > 0) {
      const fileName = `${Date.now()}-${attachment.name}`;
      const { data, error } = await Supabase.storage
        .from("files")  // Replace with your actual bucket name
        .upload(`contactform/${fileName}`, attachment);

      if (error) {
        throw new Error("Failed to upload attachment: " + error.message);
      }

      attachmentURL = data?.path ? Supabase.storage.from("files").getPublicUrl(data.path).data.publicUrl : "";
    }

    // Insert form data into Supabase table
    const { data: messageData, error: insertError } = await Supabase
      .from('messages')
      .insert([
        { name, email, message, attachment_url: attachmentURL },
      ]);

    if (insertError) {
      throw new Error("Failed to insert message into Supabase: " + insertError.message);
    }

    return { success: true, message: "Message sent successfully" };
  } catch (e) {
    console.error("Error in submitMessage:", e);
    return { success: false, message: "Failed to send message" };
  }
}
