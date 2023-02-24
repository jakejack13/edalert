//@ts-check

/**
 * Sleep for the given duration
 * @param {number} ms - duration in milliseconds
 * @returns {Promise} promise to wait on
 */
function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}


/**
 * Gets the ids of the newest posts after the given id
 * @returns {number} the list of ids of posts seen after the post of the given id
 */
function getNumNewestPosts() {
    const posts = document.querySelectorAll('span.dft-unseen-icon');
    return posts.length;
}


/**
 * The main function
 */
async function main() {
    while(true) {
        let numPosts = getNumNewestPosts();
        console.log(numPosts + " new " + ((numPosts == 1) ? "post" : "posts"));
        //@ts-expect-error
        chrome.storage.local.get(["key"]).then(async (/** @type {number} */ result) => {
            if (result !== numPosts) {
                //@ts-expect-error
                await chrome.storage.local.set({ numPosts: numPosts });                
            }
          });
        
        await sleep(5000);
    }
}

main()
