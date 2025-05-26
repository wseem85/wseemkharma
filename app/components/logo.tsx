import Image from 'next/image';

const Logo = ({ id, src, name }) => {
  return (
    <div
      className={`border w-14 h-14 border-white-500  rounded-full flex justify-center items-center bg-black-backtwo shadow-white-sm`}
    >
      <Image src={src} alt={name} width={25} height={25} />
    </div>
  );
};
export default Logo;
