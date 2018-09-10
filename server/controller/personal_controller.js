require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports={

    addTransaction: (req,res)=>{
        let db = req.app.get('db')
        let {price} = req.body;
        console.log(price)

        db.create_transaction([price])
        .then(resp=>{
            res.status(200).send('thank you for the purchase')
        })
    },
    sellTransaction: (req,res)=>{
        let db = req.app.get('db')
        let {price} = req.body;
        console.log(price)

        db.create_transaction([-price])
        .then(resp=>{
            res.status(200).send('thank you for the purchase')
        })
    },
    getTransaction: (req,res)=>{
        let db=req.app.get('db')
        db.get_transaction()
        .then(resp=>{
            res.status(200).send(resp)
        })
    },
    getMens: (req,res)=>{
        let db = req.app.get('db')

        db.get_mens()
        .then(resp=>{
            res.status(200).send(resp)
        })
    },
    getWomens: (req,res)=>{
        let db=req.app.get('db')

        db.get_womens()
        .then(resp=>{
            res.status(200).send(resp)
        })
    },
    getKids: (req,res)=>{
        let db=req.app.get('db')

        db.get_kids()
        .then(resp=>{
            res.status(200).send(resp)
        })
    },
    getAccessories: (req,res)=>{
        let db=req.app.get('db')

        db.get_accessories()
        .then(resp=>{
            res.status(200).send(resp)
        })
    },
    getHats: (req,res)=>{
        let db=req.app.get('db')
        console.log(req.session)
        db.get_hats()
        .then(resp=>{
            res.status(200).send(resp)
        })
    },
    addtocart: (req,res)=>{
        let db=req.app.get('db')
        let {id:user_id} = req.session.user
        let {id} = req.body
        console.log(req.body)

        db.add_to_cart([user_id, id])
        .then(resp=>{
            res.status(200).send('added to cart')
        })
    },
    getcart: (req,res)=>{
        let db = req.app.get('db')
        let {id} = req.session.user
        db.get_cart([id])
        .then(resp=>{
            res.status(200).send(resp)
        })
    },
    handlePayment: (req,res)=>{
        const{amount, token:{id}}=req.body
        stripe.charges.create(
            {
                amount: amount,
                currency: 'usd',
                source: id,
                description: 'test charge from aaron'
            },
            (err,charge)=>{
                if(err){
                    console.log(err)
                    return res.status(500).send(err)
                }else{
                    console.log(charge)
                    return res.status(200).send(charge)
                }
            }
        )
    },
    deleteItem: (req,res)=>{
        let db = req.app.get('db')
        let {id} = req.params
        
        db.delete_item_from_cart([id]).then(()=> {
        res.status(200).send('delete from cart')
        })
        .catch( err => console.log(err, 'Deletion Failed'))
        
    },
    addShipping: (req,res)=>{
        let db = req.app.get('db')
        let{firstName, lastName, address, city, st, zip} = req.body
        let {id} = req.session.user

        db.create_shipping_info([firstName,lastName,address,city,st,zip,id])
        .then(()=>{
            res.status(200).send('added')
        })
    },
    getShipping:(req,res)=>{
        let db = req.app.get('db')
        let {id} = req.session.user 

        db.get_shipping_info([id])
        .then(resp=>{
            res.status(200).send(resp)
        })
    },
    removequantity: (req,res)=>{
        let db = req.app.get('db')
        let{id} = req.params
        console.log(id)

        db.remove_quantity([id])
        .then(resp=>{
            res.status(200).send('removed')
        })
    },
    editFirstNameInfo: (req,res)=>{
        let db = req.app.get('db')
        let {id} = req.params
        let {text} = req.body
        console.log(req.body)

        db.edit_firstname_info([id,text])
        .then(resp=>{
            res.status(200).send('editted')
        })
    },
    editLastNameInfo: (req,res)=>{
        let db = req.app.get('db')
        let {id} = req.params
        let {text} = req.body
        console.log(req.body)

        db.edit_last_name_info([id,text])
        .then(resp=>{
            res.status(200).send('editted')
        })
    },
    editAddressInfo: (req,res)=>{
        let db = req.app.get('db')
        let {id} = req.params
        let {text} = req.body
        console.log(req.body)

        db.edit_address_info([id,text])
        .then(resp=>{
            res.status(200).send('editted')
        })
    },
    editCityInfo: (req,res)=>{
        let db = req.app.get('db')
        let {id} = req.params
        let {text} = req.body
        console.log(req.body)

        db.edit_city_info([id,text])
        .then(resp=>{
            res.status(200).send('editted')
        })
    },
    editStInfo: (req,res)=>{
        let db = req.app.get('db')
        let {id} = req.params
        let {text} = req.body
        console.log(req.body)

        db.edit_st_info([id,text])
        .then(resp=>{
            res.status(200).send('editted')
        })
    },
    editZipInfo: (req,res)=>{
        let db = req.app.get('db')
        let {id} = req.params
        let {text} = req.body
        console.log(req.body)

        db.edit_zip_info([id,text])
        .then(resp=>{
            res.status(200).send('editted')
        })
    },
    deleteEverything: (req,res)=>{
        let db = req.app.get('db')
        let {id} = req.session.user
        console.log(id)

        db.delete_everything([id])
        .then(resp=>{
            res.status(200).send('deleted')
        })
    },
    addToOrder: (req,res)=>{
        let db = req.app.get('db')
        let {date, address, city, st, zip, total} = req.body
        let{id} = req.session.user

        db.add_to_order([id, date, address, city,st,zip,total])
        .then(resp=>{
            res.status(200).send('added to order')
        })
    },
    getOrders: (req,res)=>{
        let db = req.app.get('db')

        db.get_orders()
        .then(resp=>[
            res.status(200).send(resp)
        ])
    },
    adminLogin: async (req,res)=>{
        let db = req.app.get('db')
        let {username, password} = req.body
        console.log(req.body)        

        let foundAdmin = await db.find_admin([username, password])
        if(foundAdmin[0]){
            req.session.admin = foundAdmin[0]
            res.send(foundAdmin[0])
        }
        else{
            res.send('you are not authorized')
        }
    }
}
