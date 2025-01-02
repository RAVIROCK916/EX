import { useState } from "react";

import { Button, Input, Label, Loader } from "@/components";

import { Eye, EyeSlash } from "@phosphor-icons/react";
import { toast } from "sonner";
import axios from "axios";
import { SERVER_URL } from "@/constants";
import { z } from "zod";
import { router } from "@/App";
import { setToken } from "@/state/reducers/auth";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const formData = { email, password };

  const formSchema = z.object({
    email: z.string().email("Invalid email address!"),
    password: z
      .string()
      .min(4, { message: "Password is too short!" })
      .max(20, { message: "Password is too long!" }),
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // validation

    const formValidation = formSchema.safeParse(formData);

    if (!formValidation.success) {
      formValidation.error.errors.forEach((error) => {
        toast.error(`${error.path}: ${error.message}`);
      });
      return;
    }

    setIsLoading(true);

    // send login request to server

    try {
      const res = await axios.post(
        `${SERVER_URL}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      dispatch(setToken(res.data.token));

      router.navigate({ to: "/" });
    } catch (err: any) {
      console.log("error: ", err);

      const err_code = err.response.data.code;

      switch (err_code) {
        case "form_param_format_invalid":
          toast.error("Invalid email. Please enter a valid one.");
          break;
        case "form_password_pwned":
          toast.error("The password is incorrect. Please try again.");
          break;
        default:
          toast.error("An error occurred. Please try again");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-y-6 px-0.5 py-8">
      <h2 className="text-2xl font-semibold">Login to EX</h2>
      <form onSubmit={handleLogin} className="w-full">
        <div className="w-full space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            // disabled={!isLoaded || isLoading}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="mt-4 space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative w-full">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              // disabled={!isLoaded || isLoading}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="12345678"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              // disabled={!isLoaded || isLoading}
              className="absolute right-1 top-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
            </Button>
          </div>
        </div>
        <div className="mt-4 w-full">
          <Button
            type="submit"
            // disabled={!isLoaded || isLoading}
            disabled={isLoading}
            className="flex w-full items-center gap-1"
          >
            <span>Login </span>
            {isLoading && <Loader />}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
