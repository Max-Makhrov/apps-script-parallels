<script>
  const owner = "Max-Makhrov";
  const repo = "apps-script-parallels";
  const path = "assets/doc.json";
  const branch = "parallels-test";

  var content = getgit(owner, repo, path, branch);
  console.log(content);

  // https://api.github.com/repos/Max-Makhrov/apps-script-parallels/contents/assets/doc.json?ref=parallels-test

  async function getgit(owner, repo, path, branch) {
    // A function to fetch files from github using the api

    let data = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`
    )
      .then((d) => d.json())
      .then((d) =>
        fetch(
          `https://api.github.com/repos/${owner}/${repo}/git/blobs/${d.sha}`
        )
      )
      .then((d) => d.json())
      .then((d) => JSON.parse(atob(d.content)));

    return data;
  }
</script>
