import { useNavigate } from "react-router-dom";

export const GoToPage = (url) => {
    console.log("check url===>",url);
  let navigate = useNavigate();
  navigate(url);
};

