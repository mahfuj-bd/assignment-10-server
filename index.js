const express = require('express');
const cors = require ('cors');

const app = express();

// middleware

app.use(cors());
app.use(express.json());

// mrmahfuj
// rvwqeudE1VQSQxss

const port = process.env.PORT || 5000;


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mrmahfuj:rvwqeudE1VQSQxss@cluster0.bolbqz3.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const dataCollection = client.db('dataDB').collection('product');
    const cartCollection = client.db('cartDB').collection('cart')

    app.post('/cart', async (req, res) =>{
      const cartItem = req.body
      const result = await cartCollection.insertOne(cartItem)
      res.send(result)
    })

    app.get('/cart', async (req, res) =>{
      const result = await cartCollection.find().toArray();
      res.send(result);
    })

    app.post('/products', async (req, res) =>{
      const product = req.body;
      console.log('product', product);
      const result = await dataCollection.insertOne(product);
      console.log(result);
      res.send(result)
    })
    
    app.get('/products',async(req,res)=>{
      const cursor = dataCollection.find();
      const result = await cursor.toArray();
      res.send(result);
  })

  app.get('/products/:id',async(req,res)=>{
   const id = req.params.id;
   console.log(id);
   const query = {
    _id : new ObjectId(id)
   }
    const result = await dataCollection.findOne(query)
    console.log(result);
    res.send(result)
})

app.delete('/cart/:id', async (req, res) => {
  const id = req.params.id
  console.log(id);
  const query = { _id : id}
  const result = await cartCollection.deleteOne(query)
  console.log(result);
  res.send(result);
}
)


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) =>{
    res.send('crud is running.......');
});

app.listen(port, (req, res) =>{
    console.log(`App is running on port ${port}`);
})