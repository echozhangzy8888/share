var ejs = require('ejs')
var fs = require('fs')

var datas = JSON.parse(fs.readFileSync('data.json','utf-8')),
    categories = datas.categories

for(var cat in categories){
    var data = {
        filename: `${cat}.html`,
        activeCat: cat,
        categories: categories
    }
    renderFile(data)
}

renderFile({
    filename: `index.html`,
    activeCat: 'base',
    categories: categories
})

function renderFile(data){
    ejs.renderFile('template.html', data, (err, str) => {
        if (err) throw err
        fs.writeFile('dist/' + data.filename, str, 'utf-8', err => {
            if (err) throw err
            console.log(`${data.filename} generated.`)
        })

    })
}
