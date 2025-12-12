import cn from "../../lib/cn";
import { heading1Variants } from "./ui/heading1";

const Navbar = () => {
  const headerConfig = {
    title: "axel_hamilcaro()",
    navList: [
      //   {
      //     href: "#about",
      //     content: "about",
      //   },
      //   {
      //     href: "#projects",
      //     content: "projects",
      //   },
      //   {
      //     href: "#contact",
      //     content: "contact",
      //   },
    ],
  };

  return (
    <header
      className={cn(
        "px-66 py-4 w-full",
        "fixed top-0 left-0",
        "glass glow rounded-b-xl",
      )}
    >
      <nav
        className={cn("flex flex-col items-center gap-62", "sm:flex-row")}
        aria-label="Navigation principale"
      >
        <a href="/" aria-label="Accueil - Axel Hamilcaro">
          <span className={cn(heading1Variants())}>{headerConfig.title}</span>
        </a>

        {headerConfig.navList.length > 0 && (
          <ul className={"hidden sm:flex gap-15 top-0 left-0"}>
            {headerConfig.navList.map((v, i) => (
              <li key={`nav-list-${i.toString()}`}>
                <a
                  href={v.href}
                  className="text-base font-semibold capitalize text-primary hover:text-accent transition-colors"
                >
                  {v.content}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
