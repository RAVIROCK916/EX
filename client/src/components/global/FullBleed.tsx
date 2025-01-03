import { cn } from "@/utils/cn";

type FullBleedProps = {
  className?: string;
  children: React.ReactNode;
};

const FullBleed = ({ className, children }: FullBleedProps) => {
  return <div className={cn("-mx-3 xl:-mx-6", className)}>{children}</div>;
};

export default FullBleed;
