import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import "./index.css";
import store from "./redux/store.jsx";
store;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#e36397",
              colorPrimaryHover: "#e36397",
              borderRadius: "2px",
              boxShadow: "0 0 0 0",
            },
          },
          token: {
            borderRadius: "2px",
            colorPrimary: "#e36397",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
