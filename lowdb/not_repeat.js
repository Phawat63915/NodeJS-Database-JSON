import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'

export default async function not_repeat(u,f) {

    const adapter = new JSONFileSync(f)
    const db = new LowSync(adapter)

    db.read()
    if (db.data === null) {
        db.data = { posts: [] }
    }

    const { posts } = db.data

    try {
        const nofind = [];

        for (let property in u) {
            const find = posts.find(post => post[property])
            if (!find) { 
                nofind.push(property); 
            }
        }
    
        if (nofind.length === 0) { return; }
    
        const filtered = Object.keys(u)
        .filter(key => nofind.includes(key))
        .reduce((obj, key) => {
          obj[key] = u[key];
          return obj;
        }, {});
        console.log(filtered)
        posts.push(filtered)
        db.write()
    } catch (error) {
        console.log(error)
        process.exit(0);
    }
}
 

// await not_repeat({
//     "wow": {
//         "name": "phawat",
//     }
// })

// const key_name = "wow";
// await not_repeat({
//     [key_name]: {
//         "name": "phawat",
//     }
// })
