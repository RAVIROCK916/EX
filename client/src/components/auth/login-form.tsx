import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeSlash, Spinner } from "phosphor-react";

const LoginForm = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
	};

	return (
		<div className="flex flex-col items-start gap-y-6 py-8 w-full px-0.5">
			<h2 className="text-2xl font-semibold">Login to EX</h2>
			<form onSubmit={handleLogin} className="w-full">
				<div className="space-y-2 w-full">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"
						value={email}
						// disabled={!isLoaded || isLoading}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
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
							placeholder="Enter your password"
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
