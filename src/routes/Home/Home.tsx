import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Schools from "./components/Schools";

export default function Home() {

  return (
    <div className="p-4 flex flex-col gap-4">
      <Header/>
      <Schools/>
    </div>
  );
}
