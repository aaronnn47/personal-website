module.exports={
    getOrders: (req,res)=>{
        let db = req.app.get('db')

        db.get_orders()
        .then(resp=>{
            res.status(200).send(resp)
        })
    }
}