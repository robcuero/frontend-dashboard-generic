import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { login } from 'src/services/clientService';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {
  const [user, setUser] = useState({ usuario: null, contrasena: null });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const testAuth = () => {
    login(user).then((data) => {
      if (data.token) {
        sessionStorage.setItem('token', data.token);

        navigate('/dashboards/crypto');
    
   
        return;
      }
      setError(true);
    });
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <LabelWrapper color="success">Version 1.0.0</LabelWrapper>
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            Creditos Jerico
          </TypographyH1>
          <div>
            <TextField
              sx={{
                minWidth: 300
              }}
              required
              id="outlined-required"
              label="Usuario"
              onChange={(e) => setUser({ ...user, usuario: e.target.value })}
            />
          </div>
          <div>
            <TextField
              sx={{
                mt: 3,
                mb: 3,
                minWidth: 300
              }}
              id="outlined-password-input"
              label="Contraseña"
              type="password"
              onChange={(e) => setUser({ ...user, contrasena: e.target.value })}
              autoComplete="current-password"
            />
          </div>
          {error && (
            <Alert severity="error">
              This is an error alert — check it out!
            </Alert>
          )}

          <Button
            onClick={testAuth}
            size="large"
            variant="contained"
            disabled={user.usuario && user.contrasena ? false : true}
          >
            Ingresar
          </Button>

          <Grid container spacing={3} mt={5}>
            <Grid item md={6}>
              <MuiAvatar>
                <img
                  src="/static/images/logo/material-ui.svg"
                  alt="Material-UI"
                />
              </MuiAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>JORGE LOAYZA</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  CEO y fundador de CREDITOS JERICO, servicio de ventas de productos de casa.
                </Typography>
              </Typography>
            </Grid>
            <Grid item md={6}>
              <TsAvatar>
                <img
                  src="/static/images/logo/typescript.svg"
                  alt="Typescript"
                />
              </TsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}>
                  <b>GENNY ZAMBRANO</b>
                </Box>
                <Typography component="span" variant="subtitle2">
                  CEO y co-fundadora de CREDITOS JERICO, servicio de ventas de productos de casa.
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
