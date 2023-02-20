import { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config.js";
import { db } from "../firebase-config.js";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AppContext from "../Contexts/AppContexts.js";
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

//*BUG IN DEPARTMENT AND YEAR, WRONG VALUE BEING SUBMITTED - fixed to be tested
//TODO: Show an alert if the email is already in use and redirect to login page. - done
//TODO: Handle failed submit errors. - done
//TODO: Handle if already logged in, immediately redirect. - done

export default function SignInSide() {
  const navigate = useHistory();
  const AppContexts = useContext(AppContext);
  const { showAlert, showSpinner } = AppContexts;
  const {
    register,
    formState: { errors },
    getValues,
    reset,
    handleSubmit,
  } = useForm();
  const [dept, setDept] = useState("cse");
  const [year, setYear] = useState(1);
  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      navigate.push("/home");
    }
  });
  const onSubmit = async (data) => {
    const usersRef = collection(db, "users");
    try {
      showSpinner(true);
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("user", user.user.uid);
      const userinfo = await addDoc(usersRef, {
        uid: user.user.uid,
        email: data.email,
        usn: data.email.substring(0, 10),
        name: data.name,
        department: dept,
        year: year,
        phone: data.phone,
      });
      await updateProfile(auth.currentUser, { displayName: data.name });
      // console.log("userinfo", userinfo);
      showSpinner(false);
      showAlert(`Welcome to Connexion ${data.name}`, "success");
      localStorage.setItem("auth-token", auth.currentUser.refreshToken);
      reset({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        phone: "",
        department: "",
        year: null,
      });
      navigate.push("/home");
    } catch (error) {
      showSpinner(false);
      console.log(error.message);
      showAlert(error.code.substring(5), "error");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            // backgroundColor: (t) =>
            //   t.palette.mode === "light"
            //     ? t.palette.grey[50]
            //     : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                required
                fullWidth
                size="medium"
                error={errors.name ? true : false}
                helperText={errors.name?.message}
                id="name"
                label="Name"
                name="name"
                className="my-2"
                {...register("name", { required: "Name is Required" })}
                autoComplete="name"
                autoFocus
              />
              <TextField
                required
                fullWidth
                size="medium"
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                className="my-2"
                id="email"
                label="College Email"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value:
                      /^(1nt|1NT)[0-9]{2}[a-zA-Z]{2}[0-9]{3}.[a-zA-Z]+@nmit.ac.in$/,
                    message: "Enter College Email Only",
                  },
                })}
              />
              <TextField
                required
                fullWidth
                size="medium"
                className="my-2"
                error={errors.password ? true : false}
                helperText={errors.password?.message}
                name="password"
                label="Password"
                type="password"
                id="password"
                {...register("password", { required: "password is Required" })}
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                className="my-2"
                size="normal"
                name="confirmpassword"
                error={errors.confirmpassword ? true : false}
                helperText={errors.confirmpassword?.message}
                label="Confirm Password"
                type="password"
                id="cnfpassword"
                {...register("confirmpassword", {
                  required: "confirm password is Required",
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords should match!";
                  },
                })}
                autoComplete="current-password"
              />
              <div className="container p-0 d-flex my-2">
                <FormControl
                  required
                  name="department"
                  error={errors.department ? true : false}
                  helperText={errors.department?.message}
                  size="small"
                  className="w-50 m-0 me-3"
                  {...register("department", {
                    required: "Dept is Required",
                  })}
                  sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-label">
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    label="Department">
                    <MenuItem value={"cse"}>CSE</MenuItem>
                    <MenuItem value={"ise"}>ISE</MenuItem>
                    <MenuItem value={"me"}>ME</MenuItem>
                    <MenuItem value={"ce"}>CE</MenuItem>
                    <MenuItem value={"ece"}>ECE</MenuItem>
                    <MenuItem value={"eee"}>EEE</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  margin="normal"
                  required
                  name="year"
                  error={errors.year ? true : false}
                  helperText={errors.year?.message}
                  size="small"
                  {...register("year", { required: "Year is Required" })}
                  className="w-50 m-0"
                  sx={{ m: 1, minWidth: 150 }}>
                  <InputLabel id="demo-simple-select-label">
                    Year of Study
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    label="year">
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <TextField
                margin="normal"
                fullWidth
                size="small"
                className="my-2"
                id="phone"
                error={errors.phone ? true : false}
                helperText={errors.phone?.message}
                label="Phone"
                name="phone"
                {...register("phone", {
                  minLength: {
                    value: 10,
                    message: "Please Enter a Valid Phone Number", // JS only: <p>error message</p> TS only support string
                  },
                  maxLength: {
                    value: 10,
                    message: "Please Enter a Valid Phone Number",
                  },
                })}
                autoComplete="phone"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}>
                Signup
              </Button>
            </form>
            <Grid item>
              <Link to="/signin">{"Have an account? Sign In"}</Link>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
