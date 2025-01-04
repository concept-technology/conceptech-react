import { Grid, GridItem, Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Home-page/components/NavBar";
import GameApp from "./RawgGame/components/GameApp";
import HomeApp from "./Home-page/components/Home-App";
import ExpenseApp from "./ExpenseTraker/components/ExpenseApp";
import BlogHome from "./Blog-Page/Blog-Home";
import BlogItemDetail from "./Blog-Page/BlogItemDetail";
import PrivacyPolicy from "./privacy/Privacy_policy";
import Support from "./privacy/support";
import SignupPage from "./authentication/SignUpage";
import LoginPage from "./authentication/LoginPage";
import PrivateRoute from "./authentication/PrivateRoutes";
import ResetPassword from "./user/resetPassword";
import Profile from "./user/Profile";
import NotFound from "./Home-page/components/NotFound";
import ContactForm from "./Home-page/components/ContactForm";
import ProjectHome from "./Home-page/Project-Page/Project-Home";
import projecObject from "./Home-page/Project-Page/Project-Object";
import PasswordResetRequest from "./user/PasswordResetRequest";
import PasswordReset from "./user/PasswordResetComponent";
import SocialAuthHandler from "./authentication/SocialAuthHandler";
import LoginCallback from "./authentication/LoginCallBack";
import CreateDatabaseForm from "./database/CreateDB";
import DatabaseDetailView from "./database/dbDetails";
import DatabaseHomePage from "./database/Homepage";
import ProductDetail from "./products/ProductDetail";

function App() {
  return (
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
        px={{ base: 4, md: 8 }}
        py={6}
      >
        <Box maxW="1200px" mx="auto">
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
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/social-auth" element={<SocialAuthHandler />} />
            <Route path="/login/callback" element={<LoginCallback />} />
            <Route path="password-reset/request" element={<PasswordResetRequest />} />
            <Route path="password-reset/done" element={<PasswordReset />} />
            <Route
              path="project"
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
            <Route
              path="reset-password"
              element={<PrivateRoute><ResetPassword /></PrivateRoute>}
            />
            <Route path="create/database" element={<CreateDatabaseForm />} />
            <Route path="database/view" element={<DatabaseDetailView />} />
            <Route path="database/" element={<DatabaseHomePage />} />
            <Route path="/products/:id/:slug" element={<ProductDetail />} />
          </Routes>
        </Box>
      </GridItem>
    </Grid>
  );
}

export default App;
