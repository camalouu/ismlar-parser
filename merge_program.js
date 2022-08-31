const { readFile, writeFile } = require('fs').promises

const langs = [
  readFile('./results/Arabcha.json', 'utf-8'),
  readFile('./results/Yahudiycha.json', 'utf-8'),
  readFile('./results/Boshqalar.json', 'utf-8'),
  readFile('./results/Ruscha.json', 'utf-8'),
  readFile('./results/Fors-tojikcha.json', 'utf-8'),
  readFile('./results/Qozoqcha.json', 'utf-8'),
  readFile('./results/Pahlaviycha.json', 'utf-8'),
  readFile('./results/Suryoniycha.json', 'utf-8'),
  readFile('./results/Mo‘g‘ulcha.json', 'utf-8'),
  readFile('./results/O‘zbekcha.json', 'utf-8'),
]

Promise.all(langs).then(data => {
  const parsed = data
    .map(JSON.parse)
    .reduce((a, b) => [...a, ...b], [])
    .sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0;
    });
  writeFile('./results/merged.json', JSON.stringify(parsed, null, 2)).then(err => {
    if (err) throw err
    console.log('merged')
  })
})
