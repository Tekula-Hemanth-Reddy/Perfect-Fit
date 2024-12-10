export const rnLevel: {
    [key: string]: {
        backgroundColor: string,
        lightBackgroundColor: string,
        textColor: string, // Text color for background
        lightTextColor: string, // Text color for light background
    }
} = {
    Beginner: {
        backgroundColor: '#64B5F6', // moderate blue
        lightBackgroundColor: '#B3E5FC', // softer light blue
        textColor: '#FFFFFF', // dark blue for background color
        lightTextColor: '#01579B', // same dark blue for light background
    },
    Novice: {
        backgroundColor: '#66BB6A', // darker, richer green
        lightBackgroundColor: '#A5D6A7', // light green
        textColor: '#FFFFFF', // dark green for background color
        lightTextColor: '#388E3C', // same dark green for light background
    },
    Intermediate: {
        backgroundColor: '#FF7043', // moderate orange
        lightBackgroundColor: '#FFAB91', // lighter orange
        textColor: '#FFFFFF', // dark red for background color
        lightTextColor: '#D32F2F', // same dark red for light background
    },
    Advanced: {
        backgroundColor: '#D32F2F', // strong red
        lightBackgroundColor: '#FFCDD2', // pale red
        textColor: '#FFFFFF', // white for background color
        lightTextColor: '#D32F2F', // dark red for light background
    },
    Expert: {
        backgroundColor: '#7B1FA2', // purple
        lightBackgroundColor: '#E1BEE7', // light lavender
        textColor: '#FFFFFF', // white for background color
        lightTextColor: '#7B1FA2', // same purple for light background
    },
    Master: {
        backgroundColor: '#6D4C41', // deep brown
        lightBackgroundColor: '#D7CCC8', // light beige/cream
        textColor: '#FFFFFF', // white for background color
        lightTextColor: '#6D4C41', // deep brown for light background
    },
}
