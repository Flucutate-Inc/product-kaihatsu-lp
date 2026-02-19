import ClientEffects from "./ClientEffects";
import "./globals.css";

export const metadata = {
  title: "Product Cases",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <ClientEffects />
        {children}
      </body>
    </html>
  );
}
