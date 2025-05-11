export const AnimatedText = () => {
  return (
    <h1 style={{ fontSize: '100px', fontWeight: 'bold', paddingBottom: '20px' }}>
      <span style={{
        display: 'inline-block',
        animation: 'sizeFirst 2s ease-in-out infinite'
      }}>o</span>
      <span style={{ fontSize: '80px' }}>.</span>
      <span style={{
        display: 'inline-block',
        animation: 'sizeSecond 2s ease-in-out infinite'
      }}>o</span>
      <style>
        {`
          @keyframes sizeFirst {
            0%, 100% { font-size: 60px; }
            50% { font-size: 100px; }
          }
          @keyframes sizeSecond {
            0%, 100% { font-size: 100px; }
            50% { font-size: 60px; }
          }
        `}
      </style>
    </h1>
  );
};