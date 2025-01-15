import { cn } from "@/utils/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Sidebar = ({ children, className }: Props) => {
  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen p-2 sm:block sm:p-4 lg:p-6",
        className,
      )}
    >
      {children}
    </aside>
  );
};

export default Sidebar;
