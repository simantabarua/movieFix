import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <main className="flex flex-col  min-h-screen">
        <Navbar />
        <div className="grow-1 bg-black/90 flex flex-col  justify-center ">
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  );
}
