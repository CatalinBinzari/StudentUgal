const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();
//'formidable' required libs for uploading img, it helps for request with files
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const async = require('async')
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(encodeURI(process.env.DATABASE));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

//Models
const { User } = require("./models/user");
const { Category } = require("./models/category");
const { Order } = require("./models/order");
const { Product } = require("./models/product");
const { Subscriber } = require("./models/subscriber");
const { Contact } = require("./models/contact");
const { Site } = require('./models/site');

//==========================================
//             ADD PRODUCTS
//==========================================
//Middlewares
const { auth } = require("./middleware/auth");

//show products
//show products
app.get("/api/product/", (req, res) => {
  Product.find({})
    .populate("category")
    .exec((err, products) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(products);
    });
});
//show product by id
app.get("/api/product/prod_by_id", (req, res) => {
  let items = req.query.id;

  Product.find({ _id: { $in: items } })
    .populate("category")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

//add product
app.post("/api/product", (req, res) => {
  //err
  // if (err) return res.json({ success: false, err });
  try {
    const addProd = new Product(req.body);

    addProd.save((err, newProduct) => {
      if (err) {
        // return next(err);
      }
      res.status(200).send({
        success: true,
        product: newProduct,
      });
    });
  } catch (err) {
    throw new GeneralError(err);
  }
});
//GET /products/[product_id]${id}
//update product

// return res.status(200).send(
//   success: true,
//   updatedProd: newUpdatedProduct,
// });
//update
app.put(`/api/product/update`, (req, res, next) => {
  try {
    Product.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      {
        $set: req.body, //req.body
      },
      { new: true },
      (err, newUpdatedProduct) => {
        if (err) {
          return next(err);
        }
        return res.status(200).send({
          success: true,
          updated: newUpdatedProduct,
        });
      }
    );
  } catch (err) {
    throw new GeneralError(err);
  }
});

//remove
app.delete(`/api/product/delete`, (req, res) => {
  try {
    Product.findByIdAndDelete(
      { _id: `${req.query.id}` },
      (err, newDeletedProduct) => {
        if (err) {
          return next(err);
        }
        return res.status(200).send({
          success: true,
        });
      }
    );
  } catch (err) {
    throw new GeneralError(err);
  }
});

//        GET PRODUCT TO SHOP
app.post("/api/product/shop", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    //looping all the filters we get
    if (req.body.filters[key].length > 0) {
      //check if its empty or not
      if (key === "price") {
        //pass an object to array
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  //console.log(findArgs) response in server terminal
  findArgs["publish"] = true;
  Product.find(findArgs)
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        //reducer expects article && size
        size: articles.length,
        articles,
      });
    });
});

//==========================================
//             TEST SERVER WORKING
//==========================================
//http://localhost:3002/api/test
app.get("/api/test", (req, res) => {
  res.status(200).json({
    server_on: true,
  });
});
//==========================================

//==========================================

//===============================
//             UPLOAD IMAGES
//==========================================

app.post("/api/users/uploadimage", formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    (result) => {
      //console.log(result);
      res.status(200).send({
        public_id: result.public_id,
        url: result.url,
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    }
  );
});

app.get("/api/users/removeimage", (req, res) => {
  let image_id = req.query.public_id;

  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.status(200).send("ok");
  });
});
//==========================================

//===============================
//             AUTH
//==========================================
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === "student" ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history,
    createdAt: req.user.createdAt,
  });
});

//==========================================
//             GET USERS FOR LIST
//==========================================
app.get("/api/admin/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).send(err);

    res.status(200).send(users);
  });
});

//==========================================
//             GET SUBSCRIBERS FOR LIST
//==========================================
app.get("/api/admin/subscribers", (req, res) => {
  Subscriber.find({}, (err, users) => {
    if (err) return res.status(400).send(err);

    res.status(200).send(users);
  });
});

//==========================================
//             USER register
//==========================================
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      userdata: doc,
    });
  });
});
//==========================================
//             USER Login
//==========================================
app.post("/api/users/login", (req, res) => {
  //gasire email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });
    //comparare parola
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });
      //generare token

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
});
//==========================================
//==========================================
//             USER Logout
//==========================================
app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});
// //==========================================
// //             USER auth
// //==========================================

// app.get("/api/users/auth", auth, (req, res) => {
//   res.status(200).json({
//     isAdmin: req.user.role === ADMIN ? false : true,
//     isAuth: true,
//     email: req.user.email,
//     name: req.user.name,
//     lastname: req.user.lastname,
//     role: req.user.role,
//   });
// });


app.post('/api/users/editUser', auth, (req, res) => {

  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      "$set": req.body
    },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    }
  );
})

app.post('/api/users/addToCart', auth, (req, res) => { //auth return the req.user and req.token
  User.findOne({ _id: req.user._id }, (err, doc) => {
    let duplicate = false //by default we dont have duplicate entry
    doc.cart.forEach( //loop all the info the user have inside the card(user.js/cart) and if it's repeated, change duplicate to true
      (item) => {
        if (item.id == req.query.productId) { //req.query.productId come from the client right now
          duplicate = true;
        }
      })
    if (duplicate) { //modify the quantity
      User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": mongoose.Types.ObjectId(req.query.productId) }, //find the user and the cart.id
        { $inc: { "cart.$.quantity": 1 } }, //goto the record and increment the value
        { new: true }, //sending everything inside the cart to the user
        () => { }
      )
    } else {
      User.findOneAndUpdate( //update whatever is inside the user
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(req.query.productId), //we will search by id later
              quantity: 1, //it's unique, if dublicated we do it upper
              date: Date.now()
            }
          }
        },
        { new: true },// to get document back
        (err, doc) => { //callback funct
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cart)
        }

      )
    }
  })
})

app.get('/api/users/removeFromCart', auth, (req, res) => {

  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      "$pull":
        { "cart": { "id": mongoose.Types.ObjectId(req.query._id) } }
    },
    { new: true },
    (err, doc) => {
      let cart = doc.cart;
      let array = cart.map(item => {
        return mongoose.Types.ObjectId(item.id)
      });

      Product.
        find({ '_id': { $in: array } }).
        exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart
          })
        })
    }
  );
})
//==========================================
//            CATEGORIES
// TODO: add admin middleware and auth middleware
//==========================================

//create a new category
app.post("/api/categories", (req, res) => {
  const category = new Category(req.body);

  category.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      category: doc,
    });
  });
});

//display all categories
app.get("/api/categories", (req, res) => {
  let id = req.query.id;
  id
    ? Category.find({ _id: `${id}` }, (err, categories) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(categories);
    })
    : Category.find()
      .sort({ updatedAt: -1 })
      .exec((err, categories) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(categories);
      });
});

//delete one category by name
///api/categories/delete?name=tech
app.delete("/api/categories/delete", (req, res) => {
  let id = req.query.id;
  Category.deleteOne({ _id: `${id}` }, (err, doc) => {
    if (err) return res.json({ deleted: false, err });
    res.status(200).json({
      deleted: true,
    });
  });
});

//update one category
//{{url}}/api/categories/modify?old=clothes&new=cars
app.put("/api/categories/modify", (req, res) => {
  let old_name = req.query.old;
  let new_name = req.query.new;
  Category.findOneAndUpdate(
    { name: `${old_name}` },
    { name: `${new_name}` },
    { upsert: true }, //upsert = true option creates the object if it doesn't exist.
    (err, doc) => {
      if (err) return res.json({ deleted: false, err });
      res.status(200).json({
        saved: true,
      });
    }
  );
});

app.put("/api/categories/subcategory", (req, res) => {
  let id = req.query.id;
  let new_subcategory = req.query.subcategory;
  Category.findOne({ _id: `${id}` }, (err, doc) => {
    let duplicate = false; //by default we dont have duplicate entry
    doc.subcategory.forEach(
      //loop all the info and if it's repeated, change duplicate to true
      (subcat) => {
        if (subcat == new_subcategory) {
          duplicate = true;
        }
      }
    );
    if (duplicate) {
      return res.json({ success: false, exists: true });
    } else {
      Category.findOneAndUpdate(
        { _id: `${id}` },
        {
          $push: {
            subcategory: `${new_subcategory}`,
          },
        },
        { new: true }, //to get document back
        (err, doc) => {
          if (err) return res.json({ success: false, err });
          res.status(200).json({ success: true, exists: false, doc });
        }
      );
    }
  });
});

app.delete("/api/categories/subcategory", (req, res) => {
  let id = req.query.id;
  let old_subcategory = req.query.subcategory;
  console.log("delete req");
  //console.log(old_subcategory);

  Category.findByIdAndUpdate(
    { _id: `${id}` },
    {
      $pull: {
        subcategory: `${old_subcategory}`,
      },
    },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({ success: true, doc });
    }
  );
});

//==========================================

//==========================================
//             USER subscribe
//==========================================
app.post("/api/users/subscribe", (req, res) => {
  const subscriber = new Subscriber(req.body);

  subscriber.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      subscribe: doc,
    });
  });
});


//GET PRODUCTS
//By ARRIVAL
// /articles?sortBy=createdAt&order=desc&limit=4

//By SELL
// /articles?sortBy=sold&&order=desc&limit=4&skip=5
app.get('/api/product/articles', (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Product.
    find().
    populate("category").
    sort([[sortBy, order]]).
    limit(limit).
    exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles)
    })
})



app.get('/api/product/articles_by_id', (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(',');
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item)
    })
  }


  Product.
    find({ '_id': { $in: items } }).
    populate("category").
    exec((err, docs) => {

      return res.status(200).send(docs)
    })
});


app.post('/api/users/successBuy',auth,(req,res)=>{
  let history = []
  let transactionData = {}

  //user history
  req.body.cartDetail.forEach((item) => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.name,
      id: item._id,
      price: item.price,
      category: item.category.name,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
    });
  });

  //payment dash
  transactionData.user ={
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email
  }

  transactionData.product = history;
  transactionData.payment = req.body.paymentData;

  User.findOneAndUpdate(
    {_id:req.user._id},
    {$push:{history:history}, $set:{ cart:[] }},
    {new: true},
    (err,user)=>{
      if(err) return res.json({success:false,err});

      const order = new Order(transactionData)
      order.save((err,doc)=>{
      if(err) return res.json({success:false,err});
      
      let products = []
      doc.product.forEach(item=>{
        products.push({
          id:item.id,
          quantity: item.quantity
        })
      })
      
      async.eachSeries(products,(item, callback)=>{
        Product.update(
          {_id: item.id},
          {$inc:{
            "sold":item.quantity
          }},
          {new:false},
          callback
        )
      },(err)=>{
        if(err)  return res.json({success: false,err})
        res.status(200).json({
          success: true,
          cart: user.cart,
          cartDetail:[]
        })
      })

      })

    }
  )

})

////////////////////////////////////////////
//            CONTACT 
////////////////////////////////////////////
app.post("/api/contact", (req, res) => {
  const contact = new Contact(req.body);

  contact.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      contact: doc,
    });
  });
});

app.get("/api/contact", (req, res) => {
  let id = req.query.id;
  id
    ? Contact.find({ _id: `${id}` }, (err, contacts) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(contacts);
    })
    : Contact.find()
      .sort({ updatedAt: -1 })
      .exec((err, contacts) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(contacts);
      });
});

app.delete("/api/contact/delete", (req, res) => {
  let id = req.query.id;
  Contact.deleteOne({ _id: `${id}` }, (err, doc) => {
    if (err) return res.json({ deleted: false, err });
    res.status(200).json({
      deleted: true,
    });
  });
});


//=================================
//              SITE
//=================================

app.get('/api/admin/site_data',(req,res)=>{
  Site.find({},(err,site)=>{
      if(err) return res.status(400).send(err);
      console.log("site", site)
      res.status(200).send(site)
      
  });
});



//=================================
//              SITE
//=================================

app.get('/api/site/site_data',(req,res)=>{
  Site.find({},(err,site)=>{
      if(err) return res.status(400).send(err);
      console.log("site", site)
      res.status(200).send(site)
      
  });
});


app.put(`/api/site/site_data`, (req, res, next) => {
 console.log("server update site",req.query)
  try {
    Site.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      {
        $set: req.body 
      },
      { new: true },
      (err, newUpdatedSite) => {
        if (err) {
          return next(err);
        }
        return res.status(200).send({
          success: true,
          siteInfo: newUpdatedSite
      })
      }
    );
  } catch (err) {
    throw new GeneralError(err);
  }
});
