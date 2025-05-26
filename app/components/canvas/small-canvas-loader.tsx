import { Html, useProgress } from '@react-three/drei';
const SmallCanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html
      as="div"
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <span className="canvas-loader"></span>
      <p
        style={{
          fontSize: 8,
          color: '#f1f1f1',
          fontWeight: 500,
          //   marginTop: 40,
        }}
      >
        {progress !== 0 ? `${progress.toFixed(2)}%` : '...'}
      </p>
    </Html>
  );
};
export default SmallCanvasLoader;
