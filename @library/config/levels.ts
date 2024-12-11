export const rnLevel: {
    [key: string]: {
        backgroundColor: string,
        lightBackgroundColor: string,
        textColor: string, // Text color for background
        lightTextColor: string, // Text color for light background
    }
} = {
    Beginner: {
        backgroundColor: '#01579B', // moderate blue
        lightBackgroundColor: '#B3E5FC', // softer light blue
        textColor: '#FFFFFF', // dark blue for background color
        lightTextColor: '#01579B', // same dark blue for light background
    },
    Novice: {
        backgroundColor: '#D4AF37', // deep brown
        lightBackgroundColor: '#F8E471', // light beige/cream
        textColor: '#FFFFFF', // white for background color
        lightTextColor: '#000', // deep brown for light background

    },
    Intermediate: {
        backgroundColor: '#7B1FA2', // purple
        lightBackgroundColor: '#E1BEE7', // light lavender
        textColor: '#FFFFFF', // white for background color
        lightTextColor: '#7B1FA2', // same purple for light background
    },
    Advanced: {
        backgroundColor: '#FF7043', // moderate orange
        lightBackgroundColor: '#FFAB91', // lighter orange
        textColor: '#FFFFFF', // dark red for background color
        lightTextColor: '#D32F2F', // same dark red for light background
    },
    Expert: {
        backgroundColor: '#388E3C', // darker, richer green
        lightBackgroundColor: '#A5D6A7', // light green
        textColor: '#FFFFFF', // dark green for background color
        lightTextColor: '#388E3C', // same dark green for light background
    },
    Master: {
        backgroundColor: '#D32F2F', // strong red
        lightBackgroundColor: '#FFCDD2', // pale red
        textColor: '#FFFFFF', // white for background color
        lightTextColor: '#D32F2F', // dark red for light background
    },
}
