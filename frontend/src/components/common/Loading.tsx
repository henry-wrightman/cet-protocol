export const Loading = (width?: number, height?: number) => {
  return (
    <>
      <style jsx>{`
        .loader {
          border: 16px solid #a855f7;
          border-top: 16px solid white;
          border-radius: 50%;
          width: ${width ? width : 50}px;
          height: ${height ? height : 50}px;
          animation: spin 2s linear infinite;
          margin: auto;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="loader"></div>
    </>
  );
};
