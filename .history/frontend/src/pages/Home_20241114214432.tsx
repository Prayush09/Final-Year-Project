import polygonSVG from '../assets/icons/polygon.svg'

export default function Home() {
  return (
    <>
     <img src=`${polygonSVG}` alt="" />
    </>
  );
} Why is the img tag here giving me error in typescript? Type 'boolean' is not assignable to type 'string'.ts(2322)
index.d.ts(3259, 9): The expected type comes from property 'src' which is declared here on type 'DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>'