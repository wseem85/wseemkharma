import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
const SquareLogo = ({ src, name }) => {
  const isSmall = useMediaQuery({ maxWidth: 400 });
  const isMobile = useMediaQuery({ minWidth: 400, maxWidth: 768 });

  return (
    <motion.div
      className={`border ${
        isSmall ? 'w-10 h-10' : isMobile ? 'w-12 h-12' : ''
      } w-12 h-12 border-black-200  rounded-lg flex justify-center items-center bg-black-backtwo shadow-white-sm`}
      whileHover={{ scale: 1.1 }}
      layout
    >
      <Image
        src={src}
        alt={name}
        width={isSmall ? 20 : isMobile ? 25 : 30}
        height={isSmall ? 20 : isMobile ? 25 : 30}
      />
    </motion.div>
  );
};
export default SquareLogo;
