import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/Header";


export default function Home() {
  return (
    <div className="p-4">
      <Header/>
    </div>
  );
}
