import fsp from 'fs/promises';
import fs from 'fs';
import readline from 'readline-sync';
import colors from 'colors/safe.js';

function generateRandomString(length) {
  let output = '';
  let strings = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    output += strings.charAt(Math.floor(Math.random() * strings.length));
  }

  return output;
}

function userInput(msg, required) {
  if (required) {
    const input = readline.question(colors.red(msg));
    if (input === '') {
      console.error(colors.red('This item cannot be blank!'));
      userInput(msg, required);
    } else {
      return input;
    }
  } else {
    return readline.question(msg);
  }
}

async function writeToFile(filename, data) {
  try {
    await fsp.writeFile(filename, data, 'utf8');
    console.log(colors.green(`Success! Created ${filename}`));
  } catch (err) {
    console.error(colors.red(`Error! Failed to create ${filename}:`), err);
  }
}
console.log('ihpx.net New Post File Generator\n\nPlease input meta of new post');

const now = new Date();
const datetime = [
  now.getFullYear().toString(),
  (now.getMonth() + 1).toString().padStart(2, '0'),
  now.getDate().toString().padStart(2, '0'),
  now.getHours().toString().padStart(2, '0'),
  now.getMinutes().toString().padStart(2, '0'),
  now.getSeconds().toString().padStart(2, '0'),
];

const postID = userInput('postID (blank to generate random ID): ');
const title = userInput('title: ', true);
const description = userInput('description: ');
const author = userInput('author: ', true);
console.log('image:');
const image = { url: userInput('  url: '), alt: userInput('  alt: ') };
const category = userInput('category: ');
const tags = userInput('tags (separate with ","): ');
const ignore = userInput('ignore[y/n]: ');
if (fs.existsSync(`src/blog/${postID ? postID : generateRandomString(6)}.md`)) {
} else {
  writeToFile(
    `src/blog/${postID ? postID : generateRandomString(6)}.md`,
    `---
title: '${title}'
pubDate: ${datetime[0]}-${datetime[1]}-${datetime[2]}T${datetime[3]}:${datetime[4]}:${
      datetime[5]
    }+09
updDate: ${datetime[0]}-${datetime[1]}-${datetime[2]}T${datetime[3]}:${datetime[4]}:${
      datetime[5]
    }+09${description && `\ndescription: '${description}'\n`}
author: '${author}'${
      image.url &&
      image.alt &&
      `\nimage:
  url: '${image.url}'
  alt: '${image.alt}'\n`
    }${category && `\ncategory: '${category}'\n`}${
      tags && `\ntags: [${tags.split(',').map((tag) => `'${tag}', `)}]\n`
    }
ignore: ${(ignore.toUpperCase() === 'Y').toString()}
---
`,
  );
  if (category) {
    console.log(`Category Define:
{ id: '${category}', name: '' },`);
  }
  if (tags) {
    console.log(`Tags Define:
${tags.split(',').map((tag) => `{ id: '${tag}', name: '' }, `)}`);
  }
}
