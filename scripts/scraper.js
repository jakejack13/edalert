//@ts-check

/**
 * Gets the ids of the newest posts after the given id
 * @returns {number} the list of ids of posts seen after the post of the given id
 */
function getNumNewestPosts() {
  const posts = document.querySelectorAll('span.dft-unseen-icon');
  return posts.length;
}

/**
 * Sleep for the given duration
 * @param {number} ms - duration in milliseconds
 * @returns {Promise} promise to wait on
 */
function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function getSleepDuration() {
    return new Promise((resolve) => {
        chrome.storage.local.get("sleepDuration", function(data) {
            if (data.sleepDuration) {
                resolve(data.sleepDuration * 1000);
            } else {
                resolve(0);
            }
        });
    });
}


/**
 * The main function
 */
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

        let sleepDuration = await getSleepDuration();
        await sleep(sleepDuration);
  }
}

async function checkCount() {
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
}

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.action === "checkNow") {
            checkCount();
        }
    }
);

main()
