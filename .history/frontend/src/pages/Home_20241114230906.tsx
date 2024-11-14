import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <>
    <div className="flex items-end fixed -bottom-32 w-full">
      <img src={polygonSVG} alt="Polygon Icon" className="" />
    </div>
    </>
  );
}
