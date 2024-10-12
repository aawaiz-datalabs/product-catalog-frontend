"use server";

export async function submitSignup(formData: FormData) {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const number = formData.get("number") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const country = formData.get("country") as string;
  const password = formData.get("password") as string;

  try {
    const newUser = {
      email,
      username,
      firstname,
      lastname,
      number,
      city,
      state,
      country,
      password, // In a real app, you'd want to hash this before saving
    };

    const response = await fetch(`${process.env.JSON_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        firstname,
        lastname,
        number,
        city,
        state,
        country,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add user");
    }

    console.log("User Added Successfully");
    return { success: true, message: "User Added Successfully" };
  } catch (e) {
    console.error("Error in submitSignup:", e);
    return { success: false, message: "Failed to Add User" };
  }
}
