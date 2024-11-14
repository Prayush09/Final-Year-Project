export default function Home() {
  return (
    <>
      <div className="main-container min-h-screen flex flex-col justify-center items-center relative">
        <main className="w-full text-center">
          <h1 className="text-[80px] font-medium tracking-[1.6px] bg-gradient-to-b from-[#FF1BF7] to-[#00EFFF] bg-clip-text text-transparent">
            A Fast Blockchain.
          </h1>
          <h1 className="text-[80px] font-medium">
            Personality Driven Match Making
          </h1>
          <p className="mt-4 text-lg">
            Finding the perfect roommate just got easier.<br/> Say goodbye to endless scrolling and awkward meetups—Homeey connects you with compatible roommates based on what truly matters.<br /> Your ideal home life is just a match away!
          </p>
        </main>
      </div>
      
      <div className="fixed bottom-0 flex justify-center w-full">
        <img src={polygonSVG} alt="Polygon Icon" />
      </div>
    </>
  );
}
