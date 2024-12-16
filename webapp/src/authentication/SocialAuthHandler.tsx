import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const SocialAuthHandler: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const processSocialLogin = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        try {
          localStorage.setItem("authToken", token); // Save token
          axios.defaults.headers.common["Authorization"] = `Token ${token}`;
          toast({
            title: "Login successful!",
            description: "Welcome back!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/account/profile");
        } catch (error) {
          console.error("Error processing social login:", error);
          toast({
            title: "Error",
            description: "Failed to process login. Try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Error",
          description: "No token provided. Login failed.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      }
    };

    processSocialLogin();
  }, [navigate, toast]);

  return <div>Processing social login...</div>;
};

export default SocialAuthHandler;
