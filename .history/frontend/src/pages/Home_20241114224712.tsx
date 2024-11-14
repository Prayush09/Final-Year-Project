import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <div className="flex lg:items-baseline md:items-end justify-center fixed lg:-top-32 bottom-0 w-full">
      <img src={polygonSVG} alt="Polygon Icon" className="w-full h-auto" />
    </div>
  );
}
