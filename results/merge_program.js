const { readFile, writeFile } = require('fs').promises

const langs = [
  readFile('./Arabcha.json', 'utf-8'),
  readFile('./Yahudiycha.json', 'utf-8'),
  readFile('./Boshqalar.json', 'utf-8'),
  readFile('./Ruscha.json', 'utf-8'),
  readFile('./Fors-tojikcha.json', 'utf-8'),
  readFile('./Qozoqcha.json', 'utf-8'),
  readFile('./Pahlaviycha.json', 'utf-8'),
  readFile('./Suryoniycha.json', 'utf-8'),
  readFile('./Mo‘g‘ulcha.json', 'utf-8'),
  readFile('./O‘zbekcha.json', 'utf-8'),
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
  writeFile('./merged.json', JSON.stringify(parsed, null, 2)).then(err => {
    if (err) throw err
    console.log('merged')
  })
})
