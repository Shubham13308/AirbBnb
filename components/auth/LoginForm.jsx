"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import GoogleAuthButton from "./GoogleAuthButton";
import { jwtDecode } from "jwt-decode";
import { useFormSubmit } from "@/app/hooks/useFormSubmit";
import { useRedirect } from "@/app/hooks/useRedirect";
import { useDispatch } from "react-redux";
import { setUserData } from "@/app/redux/actions/userAction";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { submitForm } = useFormSubmit();
  const redirectTo = useRedirect();
  const dispatch = useDispatch();
  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    if (decoded?.email) {
      handleSubmit(null, decoded);
    }
  };

  const handleSubmit = async (e, decoded = null) => {
    if (e) e.preventDefault();

    const formData = new FormData();
    formData.append("email", decoded ? decoded.email : form.email);
    formData.append("password", decoded ? "" : form.password);
    formData.append("googleauth", decoded ? "1" : "0");

    await submitForm({
      url: "/api/login",
      formData,
      onSuccess: (result) => {
        if (result.status === 200) {
          

          localStorage.setItem("token", result.token);

          if (result.data?.username === "") {
            redirectTo("/profile");
          } else {
            redirectTo("/");
          }
        }

        setForm({ email: "", password: "" });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 border border-gray-300 rounded-2xl shadow-sm max-w-md mx-auto bg-white">
      <Input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <Input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <Button type="submit" className="w-full">
        Login
      </Button>
      <div className="text-center text-sm text-muted-foreground">
        or continue with
      </div>
      <div className="flex items-center justify-center gap-x-4">
        <div className="rounded-full overflow-hidden inline-block shadow-md">
          <GoogleAuthButton type="signup" onSuccess={handleGoogleSuccess} />
        </div>
        <Button type="button" onClick={() => redirectTo("/signup")}>
          Signup
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
