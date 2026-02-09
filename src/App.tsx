import { Navigate, Route, BrowserRouter, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components";
import { EditorLayout } from "./layouts";
import { LoginPage, EditorPage, PhotosPage } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <EditorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/editor" replace />} />
            <Route path="editor" element={<EditorPage />} />
            <Route path="photos" element={<PhotosPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
