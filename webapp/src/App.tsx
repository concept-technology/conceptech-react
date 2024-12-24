import { Grid, GridItem } from "@chakra-ui/react";
import GameApp from "./RawgGame/components/GameApp";
import NavBar from "./Home-page/components/NavBar";

import { Routes, Route } from "react-router-dom";
import HomeApp from "./Home-page/components/Home-App";
import ExpenseApp from "./ExpenseTraker/components/ExpenseApp";
import BlogHome from "./Blog-Page/Blog-Home";
import ProjectHome from "./Home-page/Project-Page/Project-Home";
import projecObject from "./Home-page/Project-Page/Project-Object";
import BlogItemDetail from "./Blog-Page/BlogItemDetail";
import PrivacyPolicy from "./privacy/Privacy_policy";
import Support from "./privacy/support";
import SignupPage from "./authentication/SignUpage";
import LoginPage from "./authentication/LoginPage";
import PrivateRoute from "./authentication/PrivateRoutes";

import ResetPassword from "./user/resetPassword";
import SocialAuthHandler from "./authentication/SocialAuthHandler";
import LoginCallback from "./authentication/LoginCallBack";
import Profile from "./user/Profile";
import PasswordResetRequest from "./user/PasswordResetRequest";
import PasswordReset from "./user/PasswordResetComponent";
import NotFound from "./Home-page/components/NotFound";
import ContactForm from "./Home-page/components/ContactForm";
import CreateDatabaseForm from "./database/CreateDB";
import DatabaseDetailView from "./database/dbDetails";
import DatabaseHomePage from "./database/Homepage";


function App() {
  return (
    <Grid templateAreas={{ lg: `"nav " " main"` }}>
      {/* nav bar */}
      <GridItem
        area="nav"
        position={"fixed"}
        w={"100%"}
        zIndex={999}
        borderBottom="3px solid brown"
        // bg="#2f304c"
      >
        {/* nav bar */}
        <NavBar/>
      </GridItem>

      {/* main page */}
      <GridItem
        area="main"
        position={"absolute"}
        top={{ base: 57, lg: 0 }}
        w={"100%"}
      >
        <Routes>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/" element={<HomeApp />} />
          <Route path="blog/" element={<BlogHome />} />
          <Route path="gamehub" element={<GameApp />} />
          <Route path="expenseTracker" element={<ExpenseApp />} />
          <Route path="/blog/:id/:slug" element={<BlogItemDetail />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="support" element={<Support />} />
          <Route path="signup" element={<SignupPage/>} />
          <Route path="login" element={<LoginPage/>} />
          <Route path="/social-auth" element={<SocialAuthHandler />} />
          <Route path="/login/callback" element={<LoginCallback />} />

          <Route path="password-reset/request" element={<PasswordResetRequest />} />

          <Route path="password-reset/done" element={<PasswordReset />} />

          <Route path="project" element={<PrivateRoute><ProjectHome projectItems={projecObject} /></PrivateRoute>}/>

          <Route path="contact" element={<PrivateRoute><ContactForm/></PrivateRoute>}/>

          <Route path="account/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />

          <Route path="reset-password" element={<PrivateRoute><ResetPassword/></PrivateRoute>} />
          <Route path="create/databse" element={<CreateDatabaseForm/>} />
          <Route path="database/view" element={<DatabaseDetailView/>} />
          <Route path="database/" element={<DatabaseHomePage/>} />

        </Routes>
      </GridItem>
    </Grid>
  );
}

export default App;
