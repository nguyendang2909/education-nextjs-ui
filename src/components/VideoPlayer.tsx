import { FC } from 'react';
import ReactPlayer from 'react-player';

type VideoPlayerProps = {
  url?: string;
  autoPlay?: boolean;
};

export const VideoPlayer: FC<VideoPlayerProps> = ({ url, autoPlay }) => {
  return (
    <div
      style={{
        position: 'relative',
        paddingTop: '56.25%' /* 720 / 1280 = 0.5625 */,
      }}
    >
      <ReactPlayer
        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
        style={{ position: 'absolute', top: 0, left: 0 }}
        width="100%"
        height="100%"
        playing={autoPlay || false}
        url={url}
        controls
      />
    </div>
  );
};
