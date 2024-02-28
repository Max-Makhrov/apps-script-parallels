# 👀About

Run and control concurrent `App Script` tasks from `HTML` sidebar.

### Svelte + Vite

The sidebar front-end, and the engine was made with `Svelte` in `Vite`.

# 🛠️Install

## Local installation
The project was designed to edit front-end part locally, and you'll be able to play with it in Browser, without loadind to the cloud.

It will work after you install VS Code, and Node JS to your computer. All commands given will work from your computer command line, or the terminal in VS Studio.

You may install the latest version or one of the key branches.

### Latest

Use command line commands:

```bash
cd /path/to/my-project
git clone https://github.com/Max-Makhrov/apps-script-parallels
cd apps-script-parallels
npm install
code .
```

### Branches

 1. 🩻[Naked](https://github.com/Max-Makhrov/apps-script-parallels/tree/naked-svelte-singlefile):  Vite + Svelte + Singlefile
 2. 👶🏼[svelte-sidebar](https://github.com/Max-Makhrov/apps-script-parallels/tree/svelte-sidebar): all in Version 1 + Code for mocking the sidebar and `apps.script.run` in the dev environment.
 3. 👧🏼[parallels-basics](https://github.com/Max-Makhrov/apps-script-parallels/tree/parallels-basics): concurrent tasks working demo. Good start for your next tests with parallel executions.

```bash
cd /path/to/my-project
git clone -b 🌵 https://github.com/Max-Makhrov/apps-script-parallels
cd apps-script-parallels
npm install
code .
```

Change `🌵` to the branch name = Version

## Test

### Locally in Browser

After installation:

```
npm run dev
```

## Install to Google Sheets

### Building the project

Before loading the project to the cloud, you need to run automatic code building. The Svelte will compile all the code the the regular `JS`, compatible with `App Script`:

```
npm run build
```

Notice the “`dist`” folder and the file created after the “`build`” command run:
`dist\ui\index.html`

### Clasp. Saving to Google

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
