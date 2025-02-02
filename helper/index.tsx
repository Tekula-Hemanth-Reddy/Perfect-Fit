import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
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

export const instructions: string[] = [
    `Select the level you want to play: Beginner, Novice, Intermediate, Advanced, Expert, or Master.`,
    `Select an image: You can either select from predefined images, capture a new one, or pick an image from your gallery by clicking the image photo.`,
    `Once you've selected the level and image, the game will begin with a timer.`,
    `The app will divide the image into blocks based on the level you selected and shuffle them. Rearrange the blocks to restore the image.`,
    `You can rearrange the blocks using drag and drop: Simply drag a block and drop it in the correct position to help restore the image.`,
    `You can view the original image at any time by clicking “View Image”.`,
    `If you want to go back, click “Clear Selection” to reset and choose a new level or image.`
]

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
        try {
            if (!img.uri) {
                img = Asset.fromModule(img); // Update with your asset path
                await img.downloadAsync(); // Ensure the asset is fully loaded
                const documentDirectory = FileSystem.documentDirectory;
                const fileName = img.localUri.split('/').pop(); // Get the file name from the asset URI
                const filePath = documentDirectory + fileName;

                // Copy the asset file to the document directory
                await FileSystem.copyAsync({
                    from: img.localUri,
                    to: filePath,
                });
                img.uri = filePath
            }
        } catch (error) {
            console.log(error)
        }

        const width = imgWidth * columns, height = imgHeight * rows
        const imgResult = await ImageManipulator.manipulateAsync(
            img.uri,
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
                                // left: x, // Position tiles based on their coordinates
                                // top: y,
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

export const getTimeDifference = (date1: Date, date2: Date) => {
    const differenceInMilliseconds: number = (date2 as any) - (date1 as any);

    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const millisecondsInAnHour = 1000 * 60 * 60;
    const millisecondsInAMinute = 1000 * 60;
    const millisecondsInASecond = 1000;

    const days = Math.floor(differenceInMilliseconds / millisecondsInADay);
    const hours = Math.floor((differenceInMilliseconds % millisecondsInADay) / millisecondsInAnHour);
    const minutes = Math.floor((differenceInMilliseconds % millisecondsInAnHour) / millisecondsInAMinute);
    const seconds = Math.floor((differenceInMilliseconds % millisecondsInAMinute) / millisecondsInASecond);
    let time: string = ''

    const getTime = (t: number, unit: string) => {
        return `${time} ${t} ${unit}`
    }
    if (days)
        time = getTime(days, 'days')
    if (hours)
        time = getTime(hours, 'hours')
    if (minutes)
        time = getTime(minutes, 'minutes')
    if (seconds)
        time = getTime(seconds, 'seconds')

    return time;
}

export function formatString(path: string, ...val: string[]) {
    for (let index = 0; index < val.length; index++) {
        path = path.replace(new RegExp('\\{' + `${index}` + '\\}', 'g'), val[index] || '');
    }
    return path;
}
