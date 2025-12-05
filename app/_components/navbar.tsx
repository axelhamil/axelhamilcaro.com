import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-screen flex justify-between px-5 py-4 bg-secondary-background border-primary-foreground border-b">
      <h1 className="text-2xl font-bold">Axel Hamilcaro</h1>
      <ul
        className={
          "flex top-0 left-0 text-lg text-primary-foreground uppercase gap-5"
        }
      >
        <li>
          <a href="#ici">our work</a>
        </li>
        <li>
          <a href="#la">about me</a>
        </li>
        <li>
          <a href="#ok">realisation</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
