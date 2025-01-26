import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
  <ContentLoader
    speed={0}
    width={168}
    height={410}
    viewBox="0 0 168 410"
    backgroundColor="#d1d1d1"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="168" height="240" />
    <rect x="0" y="376" rx="5" ry="5" width="70" height="27" />
    <rect x="98" y="377" rx="5" ry="5" width="70" height="27" />
    <rect x="0" y="263" rx="0" ry="0" width="168" height="98" />
  </ContentLoader>
);

export default Skeleton;
