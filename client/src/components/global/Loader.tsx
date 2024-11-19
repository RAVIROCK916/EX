import { cn } from "@/utils/cn";
import { CircleNotch } from "phosphor-react";

type LoaderProps = {
  className?: string;
};

const Loader = ({ className }: LoaderProps) => {
  return <CircleNotch className={cn("animate-spin", className)} />;
};

export default Loader;
