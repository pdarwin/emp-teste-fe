import React from "react";
import { Body } from "./Components/Body";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";

export function Layout() {
  return (
    <div className="grid-container">
      <Header />
      <Body></Body>
      <Footer />
    </div>
  );
}
