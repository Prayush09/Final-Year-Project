import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <div className="flex items-baseline justify-center fixed bottom-20 w-full">
      <img src={polygonSVG} alt="Polygon Icon" className="w-full h-auto" />
    </div>
  );
}
