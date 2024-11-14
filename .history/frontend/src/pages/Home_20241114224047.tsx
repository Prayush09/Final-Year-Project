import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <div className="flex justify-center fixed top-[40px] bottom-0 w-full">
      <img src={polygonSVG} alt="Polygon Icon" className="w-120 h-auto" />
    </div>
  );
}
