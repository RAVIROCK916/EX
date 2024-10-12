import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeSlash, Spinner } from "phosphor-react";
import { toast } from "sonner";
import axios from "axios";
import { SERVER_URL } from "@/constants";
import { useNavigate } from "@tanstack/react-router";

const LoginForm = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!username || !password) {
			toast.error("username and password are required!");
			return;
		}

		setIsLoading(true);

		try {
			await axios.post(
				`${SERVER_URL}/auth/login`,
				{
					username: username,
					password: password,
				},
				{
					withCredentials: true,
				}
			);
			navigate({ to: "/" });
		} catch (err: any) {
			console.log("error: ", err);

			const err_code = err.response.data.code;

			switch (err_code) {
				case "form_param_format_invalid":
					toast.error("Invalid username. Please enter a valid username.");
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
		<div className="flex flex-col items-start gap-y-6 py-8 w-full px-0.5">
			<h2 className="text-2xl font-semibold">Login to EX</h2>
			<form onSubmit={handleLogin} className="w-full">
				<div className="space-y-2 w-full">
					<Label htmlFor="username">Username</Label>
					<Input
						id="username"
						type="text"
						value={username}
						// disabled={!isLoaded || isLoading}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="john_doe"
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
							// disabled={!isLoaded || isLoading}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="12345678"
							className="w-full focus-visible:border-foreground"
						/>
						<Button
							type="button"
							size="icon"
							variant="ghost"
							// disabled={!isLoaded || isLoading}
							className="absolute top-1 right-1"
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
						className="w-full"
					>
						{isLoading ? <Spinner className="w-5 h-5 animate-spin" /> : "Login"}
					</Button>
				</div>
			</form>
		</div>
	);
};
export default LoginForm;
