export {}
declare global {
    interface Window {
        askImage: () => void;
        askVideo: () => void;
    }
}