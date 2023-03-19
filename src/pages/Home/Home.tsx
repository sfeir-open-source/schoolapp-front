import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import Schools from "./components/schools-list/Schools";
import Filter from "./components/filter/Filter";

export default function Home() {

  return (
    <div className="p-4 flex flex-col gap-4">
      <Header/>
      <Schools/>
    </div>
  );
}
