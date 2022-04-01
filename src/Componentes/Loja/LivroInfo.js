import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function LivroInfo(props) {
  const params = useParams();
  const [veggie, setVeggie] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.id) {
      alert("There's no veggie like that in our shopping list app");
      return;
    }

    setVeggie(props.veggies.find((e) => e.id == params.id));
  }, []);

  return veggie !== {} ? (
    <>
      <img src={veggie.url} />
      <Typography
        variant="h3"
        sx={{
          marginBottom: "2em",
        }}
      >
        {veggie.name}
      </Typography>

      <Typography
        variant="p"
        sx={{
          marginBottom: "2em",
        }}
      >
        {veggie.description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: 400,
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.addItem(veggie);
          }}
        >
          {" "}
          Add To list {veggie.price}€
        </Button>
      </Box>
    </>
  ) : (
    <Typography variant="h1">I could not find a veggie like that</Typography>
  );
}
