import "./App.css";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import StableDiffusionTextPrompt from "./stable-diffusion-text-prompt";

function App() {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h3" color="inherit" component="div">
            Mythmatic
          </Typography>
        </Toolbar>
      </AppBar>
      <StableDiffusionTextPrompt />
    </Container>
  );
}

export default App;
