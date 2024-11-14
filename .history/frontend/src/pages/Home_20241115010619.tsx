import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <>
    <div className="main-headings flex justify-center items-center">
    <main className="w-full max-w-[669px] h-[98px]">
      <h1 className="text-[80px] font-medium tracking-[1.60px] bg-gradient-to-b from-[#FF1BF7] to-[#00EFFF] bg-clip-text text-transparent">
        A Fast Blockchain.
      </h1>
    </main>
    </div>
    <div className="flex items-end justify-center fixed z-0">
      <img src={polygonSVG} alt="Polygon Icon" />
    </div>
    </>
  );
}
