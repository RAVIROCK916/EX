import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { id } = useSelector((state: RootState) => state.profile);
  return {
    id,
  };
};

export default useAuth;
