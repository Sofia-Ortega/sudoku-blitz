import { Outlet } from "react-router";
import Header from "./components/Header/Header";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-auto flex justify-center items-center p-4">
        <Outlet />
      </main>
    </div>
  );
}
