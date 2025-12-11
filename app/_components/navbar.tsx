import cn from "@/lib/cn";
import { Heading1 } from "./ui/heading1";
import { Heading2 } from "./ui/heading2";

const Navbar = () => {
  const headerConfig = {
    title: "axel_hamilcaro()",
    navList: [
      {
        href: "#about",
        content: "about",
      },
      {
        href: "#projects",
        content: "projects",
      },
      {
        href: "#contact",
        content: "contact",
      },
    ],
  };

  return (
    <header
      className={cn(
        "px-10 py-3 w-full",
        "fixed top-0 left-0",
        "bg-primary-background/30 backdrop-blur-2xl",
        "border-b",
      )}
    >
      <nav className={cn("flex flex-col items-center gap-32", "sm:flex-row")}>
        <a href="/">
          <Heading1>{headerConfig.title}</Heading1>
        </a>

        <ul className={"hidden sm:flex gap-10 top-0 left-0"}>
          {headerConfig.navList.map((v, i) => (
            <li key={`nav-list-${i.toString()}`}>
              <Heading2>
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
