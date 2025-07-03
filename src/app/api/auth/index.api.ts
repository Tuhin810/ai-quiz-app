import axios from "axios";

interface AuthPayload {
  email: string;
  password: string;
  role: number | string; // You can use number (e.g. 1) or "Admin"/"Participant"
}

export const authUser = async ({ email, password, role }: AuthPayload) => {
  try {
    const response = await axios.post(
      "http://localhost:8989/api/v1/auth/login-user",
      {
        email,
        password,
        role,
      }
    );

    return response.data; // Contains token, result, isNewUser, message
  } catch (error: any) {
    console.error("❌ User auth failed:", error);
    throw error?.response?.data || { message: "Something went wrong" };
  }
};
