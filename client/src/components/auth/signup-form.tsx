"use client";

import { Button, Input, Label, Loader } from "@/components";
import { Link } from "@tanstack/react-router";

import { Eye, EyeSlash } from "@phosphor-icons/react";

import axios from "axios";

import React, { useState } from "react";
import { toast } from "sonner";

import { SERVER_URL } from "../../constants";
import { z } from "zod";
import { router } from "@/App";
import { useDispatch } from "react-redux";
import { setToken } from "@/state/reducers/auth";

const SignUpForm = () => {
  // const { signUp, isLoaded, setActive } = useSignUp();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const dispatch = useDispatch();

  const formData = { name, email, password };

  const formSchema = z.object({
    name: z
      .string()
      .min(3, "Name should be at least 3 characters")
      .max(20, "Name cannot exceed 20 characters"),
    email: z.string().email("Invalid email address!"),
    password: z
      .string()
      .min(4, { message: "Password is too short!" })
      .max(20, { message: "Password is too long!" }),
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // form validation

    const formValidation = formSchema.safeParse(formData);

    if (!formValidation.success) {
      formValidation.error.errors.forEach((error) => {
        toast.error(`${error.path}: ${error.message}`);
      });
      return;
    }

    setIsUpdating(true);

    // send signup request to server

    try {
      const res = await axios.post(
        `${SERVER_URL}/auth/signup`,
        {
          name: name,
          email: email,
          password: password,
        },
        { withCredentials: true },
      );

      dispatch(setToken(res.data.token));

      router.navigate({ to: "/" });
    } catch (error: any) {
      console.log(error);

      toast.error("Something went wrong! Please try again.");
      return;
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-start gap-y-6 px-0.5 py-8">
      <h2 className="text-2xl font-semibold">Create an account</h2>

      <form onSubmit={handleSignUp} className="w-full">
        <div className="w-full space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="name"
            value={name}
            // disabled={!isLoaded || isUpdating}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full focus-visible:border-foreground"
          />
        </div>
        <div className="mt-4 w-full space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            // disabled={!isLoaded || isUpdating}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@gmail.com"
            className="w-full focus-visible:border-foreground"
          />
        </div>
        <div className="mt-4 space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative w-full">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              // disabled={!isLoaded || isUpdating}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="12345678"
              className="w-full focus-visible:border-foreground"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlash className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="mt-4 w-full">
          <Button
            type="submit"
            // disabled={!isLoaded || isUpdating}
            disabled={isUpdating}
            className="flex w-full items-center gap-1"
          >
            <span>Signup </span>
            {isUpdating && <Loader />}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
