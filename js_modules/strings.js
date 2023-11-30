// eslint-disable-next-line block-spacing
{/* eslint-disable max-len */ }

// export const cliHelpText =
//     `Documentation:\n
//     To Batch search a list of search terms separated by comma:
//     --g <searchTerm1, searchTerm2, ...> : Google search
//     --b <searchTerm1, searchTerm2, ...> : Bing search
//     --d <searchTerm1, searchTerm2, ...> : DuckDuckGo search\n
//     --fetch <default> : Import a predefined set of custom bookmarks.
//     --reset <bookmarks>: Deletes only the saved bookmarks.
//     --reset <all>: Reset everything, including the bookmarks and wallpaper preferences.\n
//     --help: This page`;

export const cliUnexpectedCmdText =
    `The command you have passed is invalid.\n
Type --help to read the documentation.\n`;

export const resetBookmarksWarningText =
    `This will reset bookmarks.
Make sure you have a backup to import later on.\n\n
Are you sure ?`;

export const resetAllWarningText =
    `This will reset everything.
There is no going back.\n
Are you sure?`;

export const askUserNameText =
    `Welcome to Casa Mia
What is your name?`;

export const retryUserNameText =
    `Please enter a valid name to proceed.
Maximum length allowed is 14 characters.`;

export const updateUserNameText =
    `Update your name..
Maximum length allowed is 14 characters.`;
