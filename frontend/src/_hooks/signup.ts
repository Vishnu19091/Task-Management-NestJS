import api from "@/lib/axios";

interface Prop {
  username: string;
  password: string;
}

export default async function SignUp({ username, password }: Prop) {
  try {
    const res = await api.post("/auth/signup", { username, password });
    return res.data;
  } catch (err) {
    throw err;
  }
}
