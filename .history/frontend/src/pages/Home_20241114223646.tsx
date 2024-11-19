import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <div className="flex items-end justify-center fixed bottom-0 top-10 md:w-full">
      <img src={polygonSVG} alt="Polygon Icon" />
    </div>
  );
}