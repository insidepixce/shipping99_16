import { LuShip } from "react-icons/lu";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="w-full flex place-content-between items-center p-4 text-2xl border-b border-zinc-600 mb-4">
      <Link to="/" className="flex items-center">
        <LuShip />
        <p className="pl-2">Hanghae-stargram</p>
      </Link>

      <div className="flex items-center place-content-between">
        <Link to="/upload">
          <p className="px-2 text-base">POST</p>
        </Link>
        <Link to="/login">
          <p className="px-2 text-base">Login</p>
        </Link>
        <Link to="/signup">
          <p className="px-2 text-base">Sign Up</p>
        </Link>
      </div>
    </header>
  );
};
