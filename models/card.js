const path = require('path')
const fs = require('fs')
const { resolve } = require('path')
const { rejects } = require('assert')

const p = path.join(
    require.main.filename,
    'data',
    'card,json'
)

class Card{
    add(){

    }
    
    static async fetch(){
        return new Promise((resolve,rejects) =>{
            fs.readFile(p, 'utf-8', (err, content) =>{
                if(err){
                    rejects(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Card