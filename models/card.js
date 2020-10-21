const path = require('path')
const fs = require('fs')
const { resolve } = require('path')
const { rejects } = require('assert')

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'card.json'
)

class Card{
    static async add(course){
        const card = await Card.fetch()

        const idx = card.courses.findIndex(c => c.id === course.id)
        const candidate = card.courses[idx]

        if (candidate) {
            //have course
            candidate.count++
            card.courses[idx] = candidate
        } else {
            //need add course
            course.count = 1
            card.courses.push(course)
        }

        card.price += +course.price

        return new Promise((resolve, rejects) =>{
            fs.writeFile(p, JSON.stringify(card), err =>{
                if(err){
                    rejects(err)
                } else {
                    resolve()
                }
            })
        })
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