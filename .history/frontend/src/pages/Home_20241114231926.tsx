import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <>
    <div className="flex md:items-end justify-center fixed bottom-0 md:bottom-none">
      <img src={polygonSVG} alt="Polygon Icon" className="" />
    </div>
    </>
  );
}
