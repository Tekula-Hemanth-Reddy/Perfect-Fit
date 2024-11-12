import * as ImageManipulator from 'expo-image-manipulator';
import { Asset } from 'expo-asset';
import { Image, ImageSourcePropType } from 'react-native';

export const assets: { [key: string]: ImageSourcePropType } = {
    'first': require('../assets/img/first.jpeg'),
    'second': require('../assets/img/second.jpeg'),
    'third': require('../assets/img/third.jpeg'),
    'fourth': require('../assets/img/fourth.jpeg'),
    'fifth': require('../assets/img/fifth.jpeg'),
    'sixth': require('../assets/img/sixth.jpeg')
}

export const getImageInPrefferedSize = async (img: string, height: number, width: number) => {
    try {
        const result = await ImageManipulator.manipulateAsync(
            img,
            [{ resize: { width: width, height: height } }], // Desired width and height
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );
        return result.uri
    } catch (error) {
        return img
    }
}

export const getImagesArray = async (img: ImageSourcePropType | any, imgHeight: number, imgWidth: number, rows: number, columns: number) => {
    try {
        const asset = Asset.fromModule(img); // Update with your asset path
        await asset.downloadAsync(); // Ensure the asset is fully loaded

        const width = imgWidth * columns, height = imgHeight * rows
        const imgResult = await ImageManipulator.manipulateAsync(
            asset.uri,
            [{ resize: { width: width, height: height } }], // Desired width and height
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );
        img = imgResult.uri

        const tiles: React.JSX.Element[] = [];
        for (let y = 0; y < height; y += imgHeight) {
            for (let x = 0; x < width; x += imgWidth) {
                try {
                    const result = await ImageManipulator.manipulateAsync(
                        imgResult.uri,
                        [{ crop: { originX: x, originY: y, width: imgWidth, height: imgHeight } }],
                        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                    );
                    // Push each cropped tile into the newTiles array
                    tiles.push(
                        <Image
                            key={`${x}-${y}`}
                            source={{ uri: result.uri }}
                            style={{
                                width: imgWidth,
                                height: imgHeight,
                                left: x, // Position tiles based on their coordinates
                                top: y,
                                borderWidth: 1,
                                borderRadius: 5,
                                borderColor: 'white'
                            }}
                            resizeMode="cover"
                        />
                    );
                } catch (err) {
                    console.log('Error cropping image:', err);
                }
            }
        }
        for (let i = tiles.length - 1; i > 0; i--) {
            // Generate a random index from 0 to i
            const j = Math.floor(Math.random() * (i + 1));

            // Swap the elements at index i and j
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }
        return tiles

    } catch (error) {
        return img
    }
}