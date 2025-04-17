import "./globals.css";
import Navbar from "./components/Navbar";
import "leaflet/dist/leaflet.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
