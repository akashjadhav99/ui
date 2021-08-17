import ContentLoader, { Facebook } from "react-content-loader";

const RowLoader = () => {
  return (
    <>
      <ContentLoader viewBox="0 0 380 70">
        {/* Only SVG shapes */}

        <rect x="10%" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="10%" y="40" rx="3" ry="3" width="250" height="10" />
      </ContentLoader>
    </>
  );
};

export default RowLoader;
