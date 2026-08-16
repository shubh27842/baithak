import ReactDOM from "react-dom/client";
import App from "./App";
import { inject } from '@vercel/analytics';

// Automatically injects Vercel Web Analytics tracking script cleanly
inject();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
