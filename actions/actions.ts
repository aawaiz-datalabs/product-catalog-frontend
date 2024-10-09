"use server"

import { writeFile, mkdir } from "fs/promises"
import { join } from "path"

export async function submitMessage(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string
  const attachment = formData.get("attachment") as File | null

  try {
    let attachmentURL = ""

    if (attachment && attachment.size > 0) {
      const bytes = await attachment.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${Date.now()}-${attachment.name}`
      const dirPath = join(process.cwd(), "public", "files", "contactform")
      const filePath = join(dirPath, fileName)

      // Ensure the directory exists
      await mkdir(dirPath, { recursive: true })

      // Write the file
      await writeFile(filePath, buffer)
      attachmentURL = `/files/contactform/${fileName}`
    }

    // Sending form data to the backend
    const response = await fetch(`${process.env.JSON_API_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        attachmentURL,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send message")
    }

    console.log("Message sent successfully")
    return { success: true, message: "Message sent successfully" }
  } catch (e) {
    console.error("Error in submitMessage:", e)
    return { success: false, message: "Failed to send message" }
  }
}