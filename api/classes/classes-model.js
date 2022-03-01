const db = require('../data/db-config')

async function findAll(){
return db('classes')
}
async function findById(id){
    const result =  await db('classes').where('class_id', id).first()
    return result;
}
async function findAttending(class_id){

}
async function add(classes){
    const result = db('classes').insert(classes)
    return result;
}

async function update(class_id, change){
    return db('classes').where('class_id', class_id)
            .update(change)
            .then(()=>{
                return findById(class_id)
            })

}
async function remove(class_id){
    const result = await db('classes')
                    .where('class_id', class_id)
                    .del()
    return result
}
module.exports = {
    findAll,
    findById,
    findAttending,
    add,
    update,
    remove
  };