import { ArrowLeft } from "@phosphor-icons/react";

type Props = {
  title: string;
};

const Headline = ({ title }: Props) => {
  return (
    <div className="sticky top-0 z-10 flex items-center gap-6 bg-black bg-opacity-65 py-3 text-tertiary backdrop-blur-md">
      <span className="cursor-pointer" onClick={() => history.back()}>
        <ArrowLeft className="size-6" />
      </span>
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
};
export default Headline;
