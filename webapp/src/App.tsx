import { Grid, GridItem, Box, useToast } from "@chakra-ui/react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./Home-page/components/NavBar";
import GameApp from "./RawgGame/components/GameApp";
import HomeApp from "./Home-page/components/Home-App";
import ExpenseApp from "./ExpenseTraker/components/ExpenseApp";
import BlogHome from "./Blog-Page/Blog-Home";
import BlogItemDetail from "./Blog-Page/BlogItemDetail";
import PrivacyPolicy from "./privacy/Privacy_policy";
import Support from "./privacy/support";
import SignupPage from "./authentication/SignUpage";
import Profile from "./user/Profile";
import NotFound from "./Home-page/components/NotFound";
import ContactForm from "./Home-page/components/ContactForm";
import ProjectHome from "./Home-page/Project-Page/Project-Home";
import projecObject from "./Home-page/Project-Page/Project-Object";
import PasswordResetRequest from "./user/PasswordResetRequest";
import PasswordReset from "./user/PasswordResetComponent";
import CreateDatabaseForm from "./database/CreateDB";
import DatabaseDetailView from "./database/dbDetails";
import DatabaseHomePage from "./database/Homepage";
import ProductDetail from "./products/ProductDetail";
import CheckoutPage from "./products/Checkout";
import PaymentGate from "./products/PaymentGate";
import SuccessPage from "./products/PaymentSuccess";
import PasswordRestForm from "./user/PasswordResetForm";
import ChangePasswordForm from "./user/ChangePassword";
import PrivateRoute from "./routes/PrivateRoute";
import axios from "axios";
import { SITE_DOMAIN } from "./api/apiClient";
import { SubmitHandler} from "react-hook-form";
import { loginUser } from "./features/auth/authThunks";
import { useDispatch} from "react-redux";
import { AppDispatch } from "./app/store";
import { CredentialResponse } from "@react-oauth/google";
import LoginPage, { LoginFormData } from "./authentication/LoginPage";



interface GoogleLoginApiResponse {
  success: boolean;
  user: {
    username: string;
    email: string;
  };
  message?: string;
}

function App() {
  const toast = useToast();
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();


  const handleGoogleLoginSuccess = async (response:CredentialResponse) => {
    try {
  
      const googleToken = response.credential;
  
      if (!googleToken) {
        throw new Error("Google login failed: No token received.");
      }
  
      const res = await axios.post<GoogleLoginApiResponse>(
        `${SITE_DOMAIN}/api/auth/google/login/`,
        { token: googleToken }, // ✅ Send full token, not googleId
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // If using cookies
        }
      );
      const data = res.data;
  
      if (data.success) {
        navigate("/account/profile");
        toast({
          title: "Google login successful.",
          description: `Welcome back, ${data.user.username}!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Google login failed.",
          description: data.message || "An error occurred.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error("Axios Error:", error.response?.data || error.message);
  
      toast({
        title: "Login error.",
        description:
          error.response?.data?.message || "An unexpected error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  const handleLoginFormSubit: SubmitHandler<LoginFormData> = async (data: any) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast({
        title: "Login successful.",
        description: `Welcome back, ${data.username}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  
      navigate("/account/profile");
  

    } catch (error: any) {
      toast({
        title: "Invalid login attempt.",
        description: error || "An unknown error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  


  return (
    <>
    <Grid
      templateRows="auto 1fr"
      templateAreas={{
        base: `"nav" "main"`,
      }}
      h="100vh"
      // bg="gray.100"
    >
      {/* Navbar */}
      <GridItem
        as="header"
        area="nav"
        bg="white"
        boxShadow="md"
        position="sticky"
        top="0"
        zIndex="1000"
      >
        <NavBar />
      </GridItem>

      {/* Main Content */}
      <GridItem
        as="main"
        area="main"
        overflowY="auto"
        // px={{ base: 4, md: 8 }}
        // py={6}
      >
        <Box maxW={{g:"90%",sm:"100%"}} mx="auto">
          <Routes>
            {/* Routes */}
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<HomeApp />} />
            <Route path="blog/" element={<BlogHome />} />
            <Route path="gamehub" element={<GameApp />} />
            <Route path="expenseTracker" element={<ExpenseApp />} />
            <Route path="/blog/:id/:slug" element={<BlogItemDetail />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="support" element={<Support />} />
            <Route path="signup" element={<SignupPage onGoogleLogin={handleGoogleLoginSuccess} />} />

            <Route
            path="/login"
            element={<LoginPage onGoogleLogin={handleGoogleLoginSuccess} onLoginSubmit={handleLoginFormSubit}/>}
          />

            <Route path="password-reset/request" element={<PasswordResetRequest />} />
            <Route path="password-reset/done" element={<PasswordReset />} />
            <Route
              path="products/services"
              element={<PrivateRoute><ProjectHome projectItems={projecObject} /></PrivateRoute>}
            />
            <Route
              path="contact"
              element={<PrivateRoute><ContactForm /></PrivateRoute>}
            />
            <Route
              path="account/profile"
              element={<PrivateRoute><Profile /></PrivateRoute>}
            />
            <Route path="create/database" element={<CreateDatabaseForm />} />

            <Route path="database/view" element={<DatabaseDetailView />} />

            <Route path="database/" element={<DatabaseHomePage />} />

            <Route path="/products/:id/:slug" element={<ProductDetail />} />

            <Route path="product/:id/:slug/checkout" element={<PrivateRoute><CheckoutPage/></PrivateRoute>}/>

            <Route path="order/payment" element={<PrivateRoute><PaymentGate /></PrivateRoute>}/>

            <Route path="order/payment/success" element={<PrivateRoute><SuccessPage/></PrivateRoute>}/>

            <Route path="order/payment/cancelled" element={<PrivateRoute><SuccessPage/></PrivateRoute>}/>

            <Route path="/reset-password/:uid/:token" element={<PasswordRestForm/>} />

            <Route path="change-password"element={<PrivateRoute><ChangePasswordForm/></PrivateRoute>}/>
          </Routes>
        </Box>
      </GridItem>
    </Grid>
    </>

  );
}

export default App;
