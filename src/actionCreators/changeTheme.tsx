export default function changeTheme(theme: { backgroundColor: string, color: string }) {
    return {
        type: 'CHANGED_THEME',
        payload: theme
    };
}
