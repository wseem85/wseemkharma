const Button = ({
  name,
  isBeam = false,
  containerClass,
}: {
  name: string;
  isBeam: boolean;
  containerClass: string;
}) => {
  return (
    <button className={`btn tracking-wider ${containerClass}`}>
      {isBeam && (
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-white" />
        </span>
      )}
      {name}
    </button>
  );
};
export default Button;
