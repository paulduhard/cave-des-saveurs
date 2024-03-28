export function isExternalLink(url) {
    const regex = /^(https?:)?\/\//i;
    return regex.test(url);
}