import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <div className="flex items-end justify-center fixed bottom-0 w-full">
      <img className="w-full h-84" src={polygonSVG} alt="Polygon Icon" />
    </div>
  );
}
