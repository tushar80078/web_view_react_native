import { logOutUser } from "@/redux/slice/user.slice";
import { purge } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useUserDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, userDetails } = useSelector((state) => state.user);

  const role = userDetails?.roles?.[0];
  const corporate = userDetails?.corporate;
  const name = userDetails?.first_name || "User";
  const email = userDetails?.email;

  const navigateUserTo = () => {
    if (corporate?.corporate_name == "SEBI") {
      navigate("/app/sebi");
    }
    navigate("/app/sebi");
  };

  const logout = () => {
    dispatch(logOutUser());
    purge();
  };

  return {
    isLoggedIn,
    data: userDetails,
    role,
    navigateUserTo,
    corporate,
    logout,
    name,
    email,
  };
};

export default useUserDetails;
