import Image from 'next/image';

const Logo = ({
  id,
  src,
  name,
  compact = false,
}: {
  id: number;
  src: string;
  name: string;
  compact?: boolean;
}) => {
  return (
    <div
      className={`border ${compact ? 'h-10 w-10' : 'h-14 w-14'} border-white-500 rounded-full flex justify-center items-center bg-black-backtwo shadow-white-sm`}
    >
      <Image src={src} alt={name} width={compact ? 19 : 25} height={compact ? 19 : 25} />
    </div>
  );
};
export default Logo;
