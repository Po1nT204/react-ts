import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
  <ContentLoader
    speed={0}
    width={1250}
    height={235}
    viewBox="0 0 1650 235"
    backgroundColor="#d1d1d1"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="1250" height="90" />
    <rect x="0" y="100" rx="0" ry="0" width="188" height="24" />
    <rect x="0" y="135" rx="0" ry="0" width="100" height="25" />
    <rect x="0" y="160" rx="0" ry="0" width="100" height="25" />
    <rect x="0" y="200" rx="0" ry="0" width="80" height="34" />
    <rect x="101" y="200" rx="0" ry="0" width="80" height="34" />
  </ContentLoader>
);

export default Skeleton;
