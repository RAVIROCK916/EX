import { cn } from "@/utils/cn";

type FullBleedProps = {
  className?: string;
  children: React.ReactNode;
};

const FullBleed = ({ className, children }: FullBleedProps) => {
  return <div className={cn("-mx-6 xl:-mx-12", className)}>{children}</div>;
};

export default FullBleed;
