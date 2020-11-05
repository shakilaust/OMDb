export const generateRandomUsername = () => {
    // source: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    let characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let res = '';
    let charactersLength = characters.length;
    for ( let i = 0; i < 20; i++ ) {
        res += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
    return res;
}