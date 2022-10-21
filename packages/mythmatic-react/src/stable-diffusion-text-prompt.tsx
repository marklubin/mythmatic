import { Alert, Box, Button, Grid, LinearProgress, TextField } from "@mui/material";
import { RenderTaskStatus, useGetRenderTaskLazyQuery, useGetRenderTaskQuery, useStartRenderTaskMutation } from "mythmatic-graphql-schema";
import { useState } from "react";
import { Image } from "mui-image";

export default function StableDiffusionTextPrompt() {
  const [prompt, setPrompt] = useState("");

  const [isRendering, setIsRendering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [startRenderTask, startRenderStatus] = useStartRenderTaskMutation();
  const [getRenderTaskQuery, getRenderTaskStatus] = useGetRenderTaskLazyQuery();

  function initiatePollLoopForId(id: string) {
    getRenderTaskQuery({
      variables: {
        taskId: id,
      },
      pollInterval: 500,
      onCompleted: (data) => {
        console.log(`Got response from server ${JSON.stringify(data)}.`);
        if (data.getRenderTask.status === RenderTaskStatus.Completed) {
          getRenderTaskStatus.stopPolling();
          setImageUri(data.getRenderTask.payloadUrl!);
          setIsRendering(false);
        } else if (data.getRenderTask.status === RenderTaskStatus.Failed) {
          getRenderTaskStatus.stopPolling();
          console.log(`Render task failed!`);
          setIsRendering(false);
          setHasError(true);
        }
      },
      onError: (e) => {
        getRenderTaskStatus.stopPolling();
        console.log(`Received error when trying to get task. ${e}.`);
        setIsRendering(false);
        setHasError(true);
      },
    });
  }
  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleCreateEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (prompt && prompt.length > 0) {
      setHasError(false);
      setIsRendering(true);
      startRenderTask({
        variables: {
          input: {
            prompt,
          },
        },
        onCompleted: (data) => {
          console.log(`Received task id as ${data.startRenderTask.id}.`);
          initiatePollLoopForId(data.startRenderTask.id);
        },
        onError: (e) => {
          console.log(`Received error when trying to start task. ${e}.`);
          setIsRendering(false);
          setHasError(true);
        },
      });
    }
  };

  return (
    <div>
      <Grid container spacing={5} justifyContent="center" alignItems="center">
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
          <Box
            sx={{
              width: 512,
              height: 512,
              backgroundColor: "info.dark",
              margin: 2,
            }}
          >
            {isRendering ? <LinearProgress /> : null}
            {imageUri && imageUri.length > 1 ? <Image height="512" width="512" src={imageUri} /> : null}
          </Box>
        </Grid>
      </Grid>
      {hasError ? <Alert severity="error"> There was a problem processing your request. </Alert> : null}
    </div>
  );
}
