import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {Github, Twitter } from "lucide-react";

const navigationItems = [
  { label: "Smart Contracts", href: "#" },
  { label: "Services", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Roadmap", href: "#" },
  { label: "Whitepaper", href: "#" },
];

const socialIcons = [
  { Icon: Github, href: "#" },
  { Icon: Discord, href: "#" },
  { Icon: Twitter, href: "#" },
];

export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-[1728px] mx-auto relative min-h-screen bg-[url(/looper-BG.png)] bg-cover bg-center">
        <header className="flex justify-between items-center px-12 py-8">
          <div className="font-medium text-white text-2xl">Serendale</div>

          <NavigationMenu>
            <NavigationMenuList className="flex gap-8">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    href={item.href}
                    className="text-white text-lg"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex gap-4">
            {socialIcons.map(({ Icon, href }) => (
              <Button key={href} variant="ghost" size="icon" asChild>
                <a href={href} className="text-white">
                  <Icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>
        </header>

        <main className="flex flex-col items-center justify-center text-center px-4 mt-32">
          <div className="space-y-4">
            <h1 className="text-[80px] font-medium tracking-[1.60px]">
              <span className="bg-gradient-to-b from-[#FF1BF7] to-[#00EFFF] bg-clip-text text-transparent">
                A Fast Blockchain.
              </span>
              <br />
              <span className="text-white">Scalable AI.</span>
            </h1>

            <p className="max-w-[723px] text-white text-xl tracking-[0.72px] leading-[33px] mt-8">
              Our technology performing fast blockchain (120K TPS) and it has
              guaranteed AI-based data security. Proof of Stake, its consensus
              algorithm enables unlimited speeds.
            </p>

            <div className="flex gap-4 justify-center mt-16">
              <Button
                className="h-[70px] px-8 bg-black border-2 border-transparent hover:bg-black/90"
                style={{
                  borderImage:
                    "linear-gradient(to bottom, #FF3BFF, #EC5EBE 38.02%, #5C24FF 75.83%, #D94FD5 100%) 1",
                }}
              >
                Get started
              </Button>
              <Button
                variant="outline"
                className="h-[70px] px-8 bg-black border-2 border-white hover:bg-black/90"
              >
                Ecosystems
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
