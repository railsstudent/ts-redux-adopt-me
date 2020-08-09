export default function changeLocation(location: string) {
    return {
        type: 'CHANGED_LOCATION',
        payload: location
    };
}
