import { cn } from "@/utils/cn";
import { ArrowLeft } from "@phosphor-icons/react";

type Props = {
  title: string;
  className?: string;
};

const Headline = ({ title, className }: Props) => {
  return (
    <div
      className={cn(
        "sticky top-0 z-10 flex items-center gap-6 border-b border-borderGray bg-black bg-opacity-65 py-3 text-tertiary backdrop-blur-md",
        className,
      )}
    >
      <span className="cursor-pointer" onClick={() => history.back()}>
        <ArrowLeft className="size-6" />
      </span>
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
};
export default Headline;
