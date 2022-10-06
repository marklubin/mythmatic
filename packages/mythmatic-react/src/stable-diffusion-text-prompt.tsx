import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

export default function StableDiffusionTextPrompt() {
  const [prompt, setPrompt] = useState("");

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleCreateEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (prompt && prompt.length > 0) {
      alert(`Your prompt is: ${prompt}`);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          margin="dense"
          placeholder="What can you imagine?"
          minRows={5}
          maxRows={10}
          fullWidth
          multiline
          value={prompt}
          onChange={handlePromptChange}
        />
        <Button variant="contained" size="large" onClick={handleCreateEvent}>
          Create
        </Button>
      </Grid>
      <Grid item xs={8}>
        Image Layout
      </Grid>
    </Grid>
  );
}
