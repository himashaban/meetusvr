'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  {ABeeZee} from 'next/font/google';
import { Provider } from "react-redux";
import { store } from "@/store/store";
const abeezee=ABeeZee({subsets:["latin"],weight:"400"});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={abeezee.className}
      >
        <Provider store={store}>
           {children}
        </Provider>

       
      </body>
    </html>
  );
}
