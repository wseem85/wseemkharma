import { Html } from '@react-three/drei';
const SmallCanvasLoader = () => {
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
        ...
      </p>
    </Html>
  );
};
export default SmallCanvasLoader;
