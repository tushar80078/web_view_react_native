import { useSelector } from "react-redux";

const useUserDetails = () => {
  const { isLoggedIn, userDetails } = useSelector((state) => state.auth);

  return {
    isLoggedIn,
    data: userDetails,
  };
};

export default useUserDetails;
