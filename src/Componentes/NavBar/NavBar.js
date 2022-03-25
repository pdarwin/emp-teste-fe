import "./NavBar.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export function NavBar(props) {
  const navigate = useNavigate();

  return (
    <div>
      <div class="Buttons">
        <button
          class="button-3"
          role="button"
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </button>
        <button
          class="button-3"
          role="button"
          onClick={() => {
            navigate("/contacts/2");
          }}
        >
          Contacts
        </button>
        <button
          class="button-3"
          role="button"
          onClick={() => {
            navigate("/menu");
          }}
        >
          Menu
        </button>
      </div>
      <div class="Username"> Cliente: {props.value}</div>
    </div>
  );
}
