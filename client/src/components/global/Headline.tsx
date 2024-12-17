import { ArrowLeft } from "@phosphor-icons/react";

type Props = {
  title: string;
};

const Headline = ({ title }: Props) => {
  return (
    <div className="flex items-center gap-4 text-tertiary">
      <span className="cursor-pointer" onClick={() => history.back()}>
        <ArrowLeft className="size-6" />
      </span>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};
export default Headline;
