import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
  <ContentLoader
    speed={0}
    width={250}
    height={410}
    viewBox="0 0 250 410"
    backgroundColor="#d1d1d1"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="10" rx="0" ry="0" width="250" height="280" />
    <rect x="0" y="305" rx="0" ry="0" width="105" height="25" />
    <rect x="0" y="335" rx="0" ry="0" width="165" height="25" />
    <rect x="0" y="375" rx="5" ry="5" width="80" height="35" />
    <rect x="100" y="375" rx="5" ry="5" width="80" height="35" />
  </ContentLoader>
);

export default Skeleton;
