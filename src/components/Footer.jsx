import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        backgroundColor:
          "#111827",
        color: "white",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ py: 5 }}
      >
        <Stack spacing={2}>
          <Typography
            variant="h5"
            fontWeight={900}
          >
            MyStore
          </Typography>

          <Typography
            color="rgba(255,255,255,0.7)"
          >
            Multi-vendor marketplace
            for buyers and sellers.
          </Typography>

          <Divider
            sx={{
              borderColor:
                "rgba(255,255,255,0.15)",
            }}
          />

          <Typography
            variant="body2"
            color="rgba(255,255,255,0.6)"
          >
            © 2026 MyStore. All
            rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;