import { PropertyValueFiles } from '../types';
import vib from 'node-vibrant';
import { PropertyImage } from './ContentBlocks';

export const Vibrant = async (image: string | PropertyValueFiles): Promise<number[]> => {
  let imageSrc: string;

  if (typeof image === 'string') {
    imageSrc = image;
  } else {
    imageSrc = PropertyImage(image);
  }
  const v = vib.from(imageSrc);
  const col = await v
    .getPalette()
    .then((palette) => palette)
    .catch(() => [0, 0, 0]);
  if (Array.isArray(col)) return col as number[];
  else return col.Vibrant?.rgb as number[];
};
