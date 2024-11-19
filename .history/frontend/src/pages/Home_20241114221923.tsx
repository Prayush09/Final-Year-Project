import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <div className="h-auto flex items-center justify-center"> {/* Adjusted height and alignment */}
      <img className="mb-2.5" src={polygonSVG} alt="Polygon Icon" />
    </div>
  );
}