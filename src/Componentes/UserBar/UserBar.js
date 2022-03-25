import "./UserBar.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export function UserBar(props) {
  const navigate = useNavigate();

  return (
    <div class="UserBar">
      <Button>teste</Button>
      <button
        class="button-3"
        role="button"
        onClick={() => {
          navigate("/registar");
        }}
      >
        Registar
      </button>
      <button
        class="button-3"
        role="button"
        onClick={() => {
          navigate("/home");
          props.doLogin("Paulo");
        }}
      >
        Login
      </button>
    </div>
  );
}
