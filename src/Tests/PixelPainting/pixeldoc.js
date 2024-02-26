import { writable } from "svelte/store";

const owner = "Max-Makhrov";
const repo = "apps-script-parallels";
const path = "assets/doc.json";
const branch = "parallels-test";

export const docstore = writable(null);

export async function setData() {
  let content = await getGitHubUsingApi_(owner, repo, path, branch);
  let pixels = JSON.parse(content).pixels;
  let data = { pixels };
  docstore.set(data);
}

// https://gist.github.com/wolfiex/2632b36250600d193108c044cc6d3b24#file-git-js
async function getGitHubUsingApi_(owner, repo, path, branch) {
  let data = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`
  )
    .then((d) => d.json())
    .then((d) => atob(d.content));
  return data;
}
