import { Button } from "antd";
import Cookies from "js-cookie";

export default () => {
  return (
    <Button
      onClick={() => {
        Cookies.remove("user");
        Cookies.remove("loggedIn");
        window.location.href = "/";
      }}
    >
      Logout
    </Button>
  );
};
