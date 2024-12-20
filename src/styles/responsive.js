import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
export const wp = size => {
  return (size * width) / 100;
};

export const hp = size => {
    return (size * height) / 100;
};
