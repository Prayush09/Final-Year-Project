import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <div className="flex md:items-baseline sm:items- justify-center fixed md:-top-32 bottom-0 w-full">
      <img src={polygonSVG} alt="Polygon Icon" className="w-full h-auto" />
    </div>
  );
}
