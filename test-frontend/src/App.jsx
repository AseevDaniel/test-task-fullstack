import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Loader, PrivateRoute, ActionPopup, Modal } from "./components";
import { AdminPanel, Login, Register, NotFound } from "./pages";
import AuthProvider from "./store/AuthProvider.jsx";
import { usePageState } from "./store/PageStateProvider.jsx";
import { ROUTES } from "./constants/routes.js";
import "./App.css";

function App() {
  const { isLoading, modalData, setModalData } = usePageState();
  return (
    <>
      {isLoading && <Loader />}
      <ActionPopup />
      <BrowserRouter>
        <AuthProvider>
          <>
            <Modal isOpen={!!modalData} onClose={() => setModalData(null)}>
              {modalData}
            </Modal>
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path={ROUTES.HOME} element={<AdminPanel />} />
              </Route>
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.REGISTER} element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
