import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <div className="h-64 flex items-center justify-center"> 
      <img className="mb-2.5" src={polygonSVG} alt="Polygon Icon" />
    </div>
  );
}
