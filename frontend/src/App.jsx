import { Box, Container } from "@chakra-ui/react";
import { useLocation, Navigate, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";

import userAtom from "./atoms/userAtom.js";
import {
  ChatPage,
  SettingsPage,
  PostPage,
  CreatePost,
  UserPage,
  UpdateProfilePage,
  HomePage,
  AuthPage,
} from "./pages/index.jsx";
import Header from "./components/Header.jsx";

function App() {
  const { pathname } = useLocation();

  const user = useRecoilValue(userAtom);

  return (
    <Box position="relative" w="full">
      <Container
        maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}
      >
        <Header />
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route
            path="/update"
            element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
          />

          <Route
            path="/:username"
            element={
              user ? (
                <>
                  <UserPage />
                  <CreatePost />
                </>
              ) : (
                <UserPage />
              )
            }
          />
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/settings"
            element={user ? <SettingsPage /> : <Navigate to="/auth" />}
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
