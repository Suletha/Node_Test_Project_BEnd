const { it } = require('node:test');
const Item = require('../models/item');
exports.getItems = async(req,res,next) => {
    try{
        const result = await Item.findAll();
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(500).json({error:'some Error in fetching items'})

    }
};


exports.postItem = async(req,res,next) => {
    const { name, desc, price, qty } = req.body;
    try{
        const newItem = await Item.create({
            name: name,
            desc: desc,
            price: price,
            qty: qty

        })
        console.log(newItem.id)
        res.status(201).json(newItem);
    }catch(err){
        console.error(err);
        res.status(500).json({error:'some Error in creating items'})

    }
}

exports.updateItem = async(req,res,next) => {
    const itemId = req.params.id;
    try{
        const item = await Item.findByPk(itemId);
        if(!item){
            return res.status(404).json({ error:'item unavailable'});

        }
        //To Update the Quantity
        let qty = req.body.qty;
        if(qty == 0){
            await item.destroy();
            res.status(200).json({error:'Item deleted'});
        }else{
            item.qty = qty;
            await item.save();
            res.json(item);
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Error in updating items'})
    }
}