async function main() {
    let shouldContinue = true;

    window.addEventListener('beforeunload', () => {
        shouldContinue = false;
    });

    while(shouldContinue) {
        try {
            let numPosts = getNumNewestPosts();
            console.log(numPosts + " new " + ((numPosts == 1) ? "post" : "posts"));
            //@ts-expect-error
            await chrome.storage.local.get(["numPosts"]).then(async (result) => {
                if (result.numPosts !== numPosts) {
                    //@ts-expect-error
                    await chrome.storage.local.set({ numPosts: numPosts });
                }
            });
        } catch (error) {
            console.error('Error in the loop:', error);
            if (chrome.runtime.lastError) {
                console.error('Chrome runtime error:', chrome.runtime.lastError);
            }
        }

        await sleep(2000);
    }
}
