import polygonSVG from '../assets/icons/polygon.svg';

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
        Finding the perfect roommate just got easier. Say goodbye to endless scrolling and awkward meetups—Homeey connects you with compatible roommates based on what truly matters. Your ideal home life is just a match away!
      </p>
      </main>
    </div>
    <div className="flex items-end justify-center fixed ">
      <img src={polygonSVG} alt="Polygon Icon" />
    </div>
    </>
  );
}
