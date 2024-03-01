import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  useEffect(()=>{
    console.log("layout loaded")
  }, []);
  return (
    <>
      <div>layout page!</div>
      <Outlet />
    </>
  );
}
