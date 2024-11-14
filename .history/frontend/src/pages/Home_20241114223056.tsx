import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <div className="flex items-end justify-center fixed bottom-0 md:w-full">
      <img className="w-full h-76" src={polygonSVG} alt="Polygon Icon" />
    </div>
  );
}
