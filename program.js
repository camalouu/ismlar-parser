const axios = require('axios')
const cheerio = require('cheerio')

const [, , category, pages] = process.argv

const names = []

const main = (nat, totalPages) => {
  const promises = []
  for (let i = 1; i <= totalPages; i++) {
    const url = encodeURI(`https://ismlar.com/category/${nat}?page=${i}`)
    const promise = axios
      .get(url)
      .then(({ data }) => {
        const $ = cheerio.load(data)
        $('.list-none li').each((_, row) => {
          const name = $('h1 a', row).text().trim()
          const nameDesc = $('div p', row).text().trim()
          if (name)
            names.push({
              name,
              nat,
              nameDesc
            })
        })
      })
      .catch(err => console.log(err.message))
    promises.push(promise)
  }
  return promises
}


Promise
  .all(main(category, pages))
  .then(_ => {
    require('fs')
      .writeFile(`./results/${category}.json`, JSON.stringify(names), err => {
        if (err) throw err
        console.log('done')
      })
  })

