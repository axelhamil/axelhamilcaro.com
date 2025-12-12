import cn from "../../lib/cn";
import { Heading1 } from "./ui/heading1";
import { Heading2 } from "./ui/heading2";

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
      <nav className={cn("flex flex-col items-center gap-62", "sm:flex-row")}>
        <a href="/">
          <Heading1>{headerConfig.title}</Heading1>
        </a>

        <ul className={"hidden sm:flex gap-15 top-0 left-0"}>
          {headerConfig.navList.map((v, i) => (
            <li key={`nav-list-${i.toString()}`}>
              <Heading2 size="xs" className="font-semibold capitalize">
                <a href={v.href}>{v.content}</a>
              </Heading2>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
