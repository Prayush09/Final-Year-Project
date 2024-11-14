import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <>
      <div className="main-headings h-screen flex flex-col justify-center items-center text-center">
        <main className="w-full max-w-[800px] px-4">
          <h1 className="text-[80px] font-medium tracking-[1.60px] bg-gradient-to-b from-[#FF1BF7] to-[#00EFFF] bg-clip-text text-transparent">
            A Fast Blockchain.
          </h1>
          <h1 className="text-[80px] font-medium">
            Personality Driven Match Making
          </h1>
          <p className="text-lg mt-4">
            Finding the perfect roommate just got easier.<br />
            Say goodbye to endless scrolling and awkward meetups—Homeey connects you with compatible roommates based on what truly matters.<br />
            Your ideal home life is just a match away!
          </p>
        </main>

       
      </div>
    </>
  );
}
