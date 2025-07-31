import api from "@/lib/axios";

interface Prop {
  username: string;
  password: string;
}

export default async function SignIn({ username, password }: Prop) {
  const res = await api.post("/auth/signin", { username, password });
  return res.data.accessToken;
}
