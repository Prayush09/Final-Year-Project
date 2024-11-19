import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <div className="flex items-center justify-center"> 
      <img className="h-12"src={polygonSVG} alt="Polygon Icon" />
    </div>
  );
}