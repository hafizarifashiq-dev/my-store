import {
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import {
  Link,
} from "react-router-dom";

function AccessDenied() {
  return (
    <Container
      sx={{ py: 12 }}
    >
      <Stack
        alignItems="center"
        spacing={2}
      >
        <Typography
          variant="h3"
          fontWeight={900}
        >
          Access Denied
        </Typography>

        <Typography color="text.secondary">
          You do not have permission
          to access this page.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
        >
          Go Home
        </Button>
      </Stack>
    </Container>
  );
}

export default AccessDenied;