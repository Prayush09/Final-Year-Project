import polygonSVG from '../assets/icons/polygon.svg';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
export default function Home() {
  return (
    <>
    <div className="main-headings ">
         <main className="w-full">
      <h1 className="text-[80px] font-medium tracking-[1.60px] bg-gradient-to-b from-[#FF1BF7] to-[#00EFFF] bg-clip-text text-transparent">
        A Fast Blockchain.
      </h1>
      <h1 className='text-[80px] font-medium '>
        Personality Driven Match Making
      </h1>
      <p>
      Finding the perfect roommate just got easier.<br/> Say goodbye to endless scrolling and awkward meetups—Homeey connects you with compatible roommates based on what truly matters.<br /> Your ideal home life is just a match away!
      </p>
      </main>
    </div>
    <div className="flex items-end justify-center fixed ">
    <Card className="w-full max-w-[2544px] overflow-hidden border-none shadow-none">
      <CardContent className="p-0">
        <AspectRatio
          ratio={16 / 9}
          className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"
        >
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxsaW5lIHgxPSIwIiB5MT0iMCIgeDI9IjQwIiB5Mj0iNDAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] bg-cover bg-center" />
        </AspectRatio>
      </CardContent>
    </Card>
    </div>
    </>
  );
}
