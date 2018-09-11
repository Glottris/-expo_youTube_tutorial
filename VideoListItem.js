import React from 'react';
import { View, Text, Image} from 'react-native'

const VideoListItem = ({video}) => {
  return(
    <View>
      <Image
        style={{ height: 180 }}
        source={{uri: video.snippet.thumbnails.medium.url}}
      />
      <Text>{video.snippet.title}</Text>
      <Text>{video.snippet.channelTitle}</Text>
      <Text>{video.snippet.description}</Text>
    </View>
  );
};

export default VideoListItem;
