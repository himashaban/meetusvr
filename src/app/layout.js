import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  {ABeeZee} from 'next/font/google';
const abeezee=ABeeZee({subsets:["latin"],weight:"400"});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={abeezee.className}
      >
        {children}
      </body>
    </html>
  );
}
