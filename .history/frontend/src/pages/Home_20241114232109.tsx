import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <>
    <div className="flex xl:items-baseline md:items-end justify-center fixed bottom-0">
      <img src={polygonSVG} alt="Polygon Icon" className="" />
    </div>
    </>
  );
}
