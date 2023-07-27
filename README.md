# Svelte + Vite

Google Apps Script HTML Sidebar with Svelte in Vite.

## 
Branches:

 1. 🩻[Naked](https://github.com/Max-Makhrov/apps-script-parallels/tree/naked-svelte-singlefile):  Vite + Svelte + Singlefile
 2. 👶🏼[svelte-sidebar](https://github.com/Max-Makhrov/apps-script-parallels/tree/svelte-sidebar): all in Version 1 + Code for mocking the sidebar and `apps.script.run` in the dev environment.
 3. 👧🏼[parallels-basics](https://github.com/Max-Makhrov/apps-script-parallels/tree/parallels-basics): concurrent tasks working demo. Good start for your next tests with parallel executions.

🟦Command line

```
cd /path/to/my-project
git clone -b 🌵 https://github.com/Max-Makhrov/apps-script-parallels
cd apps-script-parallels
npm install
code .
```

Change `🌵` to the branch name = Version

After installation, test it in VS Code terminal. Run:
```npm run dev, and
npm run build
```

Notice the “`dist`” folder and the file created after the “`build`” command run:
`dist\ui\index.html`

----


### 🔖Memo. Clasp. Saving to Google

Use `clasp` to install your code inside Google Sheet's script.

Install (once):\
`npm install -g @google/clasp`\
Get the version to check is installed:\
`clasp -v`\
Login:\
`clasp login`

Create a project + link it to the current local project:\
`clasp create`\
Add “`.clasp.json`” to “`.gitignore`” if you use GitHub.\
Add the root “`.claspignore`” file with the text:
```
**/**
!appsscript.json
!dist/**/**
```

Build the project:\
`npm run build`\
Optionally commit to GitHub. Update the remote project:\
`clasp push`\
Open:\
`clasp open`\
Launch in the container (Spreadsheet)
