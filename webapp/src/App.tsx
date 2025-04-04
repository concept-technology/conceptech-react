import { Grid, GridItem, Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Home-page/components/NavBar";
import GameApp from "./RawgGame/components/GameApp";
import HomeApp from "./Home-page/components/Home-App";
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
import LoginPage from "./authentication/LoginPage";
import ContactSuccessPage from "./Home-page/components/Success";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { refreshToken } from "./app/services/auth/refreshToken";


function App() {
  const token = Cookies.get("accessToken");
  useEffect(() => {
    if (token) {
      const intervalId = setInterval(() => {
        refreshToken();
      }, 300000); // Refresh token every 5 minutes

      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [token]);

  return (
    <>
    <Grid
      templateRows="auto 3fr "
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
            <Route path="/blog/:id/:slug" element={<BlogItemDetail />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="support" element={<Support />} />
            <Route path="signup" element={<SignupPage />} />

            <Route
            path="/login"
            element={<LoginPage/>}
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
            <Route path="sucessful" element={<PrivateRoute><ContactSuccessPage/></PrivateRoute> }/>
          </Routes>
        </Box>
      </GridItem>

    </Grid>
    </>

  );
}

export default App;
