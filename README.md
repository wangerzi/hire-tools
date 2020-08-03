# hire-tools
A simple hire tools for interview.
You can use it by open this url: [https://hire-tools-1252276051.file.myqcloud.com/index.html](https://hire-tools-1252276051.file.myqcloud.com/index.html)

## Purpose
For the technology interview, we can view the ability about the candidate.

## Features

- [x] Basic render charts.
- [x] Save customize template
- [ ] Manage customize template
- [ ] Record interview comment online.
- [ ] Question record and copy to use.

## Operation

### Radar chart
At first, you can edit the categoary, score, total score and the weights, on this page, and you can save this as a local template (only this browser).

![image-20200624114042249](image-20200624114042249.png)

Then click the submit button, and you can got a radar map for the candidate, the `score = sum(item.score) / sum(item.total) * 100`

![image-20200624114142791](image-20200624114142791.png)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## LICENCE

Hire-tools is licensed under the MIT License. See [LICENSE](https://github.com/GitbookIO/gitbook/blob/master/LICENSE) for the full license text.