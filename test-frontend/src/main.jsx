import ReactDOM from "react-dom/client";
import PageStateProvider from "./store/PageStateProvider.jsx";
import App from "./App.jsx";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PageStateProvider>
    <App />
  </PageStateProvider>,
);
