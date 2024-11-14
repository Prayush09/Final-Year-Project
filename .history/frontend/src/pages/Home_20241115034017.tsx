import {Button} from '@/components/ui/button'

export default function Home() {
  return (
    <>
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Looper BG"
            src="https://c.animaapp.com/d7uzXETM/img/looper-bg.png"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="main-headings flex flex-col justify-center items-center text-center relative z-10 pt-36">
          <main className="w-full max-w-[1270px] mb-16 px-4 font-grotesk">
            <h1 className="text-[80px] font-medium tracking-wide bg-gradient-to-b from-[#FF1BF7] via-[#8D4DE8] to-[#00EFFF] bg-clip-text text-transparent">
              Get A Roommate
            </h1>
            <h1 className="text-[80px] font-medium">
              Personality Driven Match Making
            </h1>
            <p className="text-lg mt-4">
              Finding the perfect roommate just got easier.<br/>
              Say goodbye to endless scrolling and awkward meetups - <span className="italic">Homeey</span> connects you with compatible roommates based on what truly matters.
              <br/>Your ideal home life is just a match away!
            </p>
          </main>
          <div className="relative inline-block">
  {/* Glowing Gradient Border */}
  <div className="absolute inset-0 rounded-full border-[3px] border-transparent bg-gradient-to-r from-[#f79533] via-[#f37055] to-[#1098ad] z-[-1] animate-gradient-spin"></div>

  {/* Button */}
  <Button
    variant="default"
    size="lg"
    className="relative z-10 rounded-full px-8 py-4 text-white bg-transparent overflow-hidden"
  >
    Get Started!
  </Button>
</div>

 
        </div>
      </div>
    </>
  );
}
