import polygonSVG from '../assets/icons/polygon.svg';

export default function Home() {
  return (
    <div className="flex items-end justify-center fixed top-[40px] bottom-0  md:w-full">
      <img className='w-full' src={polygonSVG} alt="Polygon Icon" />
    </div>
  );
}
