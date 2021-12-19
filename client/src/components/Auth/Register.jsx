import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import ShowSmallAlert from '../SingleComponent/ShowSmallAlert';
import validator from 'validator';
import { Link } from 'react-router-dom';
import REGISTER from '../../Graphql/Mutations/Register';
import { useMutation } from '@apollo/client';
import { UseGlobalContext } from '../Provider/Context';
import BackDropLoading from '../SingleComponent/BackDropLoading';

const theme = createTheme();

export default function SignUp() {

    const navigate = useNavigate()

    const [SendRegister, { error, loading, data }] = useMutation(REGISTER)

    const { setstate } = UseGlobalContext()

    const [message, setMessage] = React.useState({
        open: false,
        message: ''
    })



    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const firstName = data.get('firstName')
        const lastName = data.get('lastName')
        const email = data.get('email')
        const password = data.get('password')


        if (!firstName || !lastName || !email || !password) {
            setMessage({
                open: true,
                message: 'Please fill the input'
            })
            return;
        }
        if (!validator.isEmail(email) || email.split("@")[0].length < 5) {
            setMessage({
                open: true,
                message: 'Please enter a valid email'
            })
            return;
        }
        if (password.length < 8) {
            setMessage({
                open: true,
                message: 'Your Password should be more then 8'
            })
            return;
        }
        try {
            SendRegister({
                variables: {
                    input: {
                        firstName,
                        lastName,
                        email,
                        password
                    }
                }
            })

        } catch (error) {
            setMessage({
                open: true,
                message: 'Error try to refresh'
            })
        }
    };



    React.useEffect(() => {
        if (data) {
            if (data.signUp.success) {
                setstate({ currentUser: data.login.user })

                navigate("/", {
                    replace: true,
                })
            } else {
                setMessage({
                    open: true,
                    message: data.signUp.message
                })
            }
        }
        if (error) {
            setMessage({
                open: true,
                message: "error try to refresh"
            })
        }
    }, [data, error, navigate, setstate])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    variant="standard"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/user/login">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />
                {loading && <BackDropLoading />}

            </Container>

        </ThemeProvider>
    );
}