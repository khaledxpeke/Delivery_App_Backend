const MongoClient = require("mongodb").MongoClient;
const { faker } = require('@faker-js/faker');
import config from './config/config';

function randomIntFromInterval(min : number, max: number) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
import nodeGeocoder, * as NodeGeocoder from 'node-geocoder';

const options: NodeGeocoder.Options = {
  provider: "openstreetmap",
};

let geoCoder = nodeGeocoder(options);

async function seedDB() {
// connect to your cluster
const client = await MongoClient.connect(config.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});
    try {
        console.log("Connected correctly to server");
        // access collections
        const articlesCollection = await client.db("deliveryAppTest").collection("articles");
        const depotsCollection = await client.db("deliveryAppTest").collection("depots");
        const ordersCollection = await client.db("deliveryAppTest").collection("orders");
        const vehiculesCollection = await client.db("deliveryAppTest").collection("vehicules");
         const usersCollection = await client.db("deliveryAppTest").collection("users");
         const historyCollection = await client.db("deliveryAppTest").collection("history");
         const livraisonCollection = await client.db("deliveryAppTest").collection("livraison");

        //    articlesCollection.drop();
        //    ordersCollection.drop();
        //    vehiculesCollection.drop();
          // usersCollection.drop();
        //    depotsCollection.drop();
           historyCollection.drop();
           livraisonCollection.drop();

        let articles = [];
        let livraison = [];
        let orders = []
        let clients = []
        let deliveryMen = []
        let vehicules = []
        let history = []
        for (let i = 0; i < 20; i++) {          
            let newArtice= {
                weight :faker.datatype.float(),
                type : faker.commerce.productName(),
                price : faker.datatype.float(),
                volume : faker.datatype.float(),
                reference : faker.datatype.float(),
            };
            let newLivraison= {
                code :faker.random.word(),
                image1 : "https://cdn2.downdetector.com/static/uploads/c/300/b65e7/Ikea_logo_if0TFB2.png",
                image2 : "https://cdn2.downdetector.com/static/uploads/c/300/b65e7/Ikea_logo_if0TFB2.png",
                image3 : "https://cdn2.downdetector.com/static/uploads/c/300/b65e7/Ikea_logo_if0TFB2.png",
            };
            let newVehicule= {
                name : faker.vehicle.vehicle(),
                model :faker.vehicle.model(),
                color : faker.vehicle.color(),
                registrationNumber : faker.vehicle.vin()
            };
            let newClient = {
                name: faker.name.firstName(),
                username: faker.name.firstName(),
                email: faker.internet.email(),
                password : faker.internet.password(),
                role : "CLIENT" ,
                code: faker.random.word(), 
                address: `${faker.address.state()}, ${faker.address.city()}, ${parseInt(faker.address.zipCode())}`,
                latitude : faker.address.latitude(),
                longitude : faker.address.longitude(),
                phone : faker.phone.phoneNumber(),
                informationsSupp :  faker.hacker.phrase()
            }
 
            vehicules.push(newVehicule);
            articles.push(newArtice);
            livraison.push(newLivraison);
            clients.push(newClient);
        }
        await vehiculesCollection.insertMany(vehicules);
        await articlesCollection.insertMany(articles);
        await livraisonCollection.insertMany(livraison);
        await usersCollection.insertMany(clients);
        const vehiculesids = await vehiculesCollection.find({}).toArray().then((result : any)=> {
           return result.map((e : any) => e._id)
        })
        const depots = [
            {
                name :"IKEA",
                image :  "https://cdn2.downdetector.com/static/uploads/c/300/b65e7/Ikea_logo_if0TFB2.png",
                address: `${faker.address.state()}, ${faker.address.city()}, ${parseInt(faker.address.zipCode())}`,
                latitude : 33.346636,
                longitude : 10.488886 ,
                informationsSupp :  faker.hacker.phrase()

            },
            {
                name :"castorama",
                image :"https://cdn.1min30.com/wp-content/uploads/2018/06/Logo-Castorama-1.jpg",
                address: `${faker.address.state()}, ${faker.address.city()}, ${parseInt(faker.address.zipCode())}`,
                latitude : 33.307794,
                longitude : 10.479525,
                informationsSupp :  faker.hacker.phrase()

            }
          
        ]
         await depotsCollection.insertMany(depots)
        const depotsids = await depotsCollection.find({}).toArray().then((result : any)=> {
            return result.map((e : any) => e._id)
         })
         const articlesids = await articlesCollection.find({}).toArray().then((result : any)=> {
            return result.map((e : any) => e._id)
         })
         const livraisonsids = await livraisonCollection.find({}).toArray().then((result : any)=> {
            return result.map((e : any) => e._id)
         })
         const clientids = await usersCollection.find({          
                 role : "CLIENT"             
         }).toArray().then((result : any)=> {
            return result.map((e : any) => e._id)
         })
        for (let i = 0; i < 5; i++) { 
            let newDeliveryMan = {
                  name: faker.name.firstName(),
                  username:  faker.name.firstName(),
                  email: faker.internet.email(),
                  password : faker.internet.password(),
                  role : "DELIVERY_MAN" ,
                  code: faker.random.word(),
                  phone : faker.phone.phoneNumber(),
                  vehicule: vehiculesids[Math.floor(Math.random()*vehiculesids.length)],
                  informationsSupp :  faker.hacker.phrase()
        
            }
            deliveryMen.push(newDeliveryMan);
        }
        await usersCollection.insertMany(deliveryMen);
        const deliveryMenids = await usersCollection.find({
         
                role : "DELIVERY_MAN"
            
        }).toArray().then((result : any)=> {
           return result.map((e : any) => e._id)
        })

        if(deliveryMenids.length > 0 && clientids.length > 0 ) {
            for (let i = 0; i < 3; i++) { 
                let newOrder = { 
                    title : `Commande ${Math.floor(Math.random()*10000)}` ,               
                    client: clientids[Math.floor(Math.random()*clientids.length)] , 
                    deliveryMan :deliveryMenids[Math.floor(Math.random()*deliveryMenids.length)] , 
                    depot: depotsids[0]  ,
                    article:articlesids[Math.floor(Math.random()*articlesids.length)] ,
                    livraison:livraisonsids[Math.floor(Math.random()*livraisonsids.length)] ,
                    status: "CONFIRMED",
                    startDate: faker.date.between('2022-04-06', '2022-04-30'),
                    endDate: faker.datatype.datetime(),
                    destination: `${faker.address.state()}, ${faker.address.city()}, ${parseInt(faker.address.zipCode())}`,
                    latitude : faker.address.latitude(),
                    longitude : faker.address.longitude(),
                    totalPrice : faker.datatype.float(),
                    informationsSupp :  faker.hacker.phrase()

                }
                let newHistory = { 
                    title : `Commande ${Math.floor(Math.random()*10000)}` ,               
                    client: clientids[Math.floor(Math.random()*clientids.length)] , 
                    deliveryMan :deliveryMenids[Math.floor(Math.random()*deliveryMenids.length)] , 
                    depot: depotsids[0]  ,
                    deliverybyDate: faker.date.between('2022-04-06', '2022-04-30'),
                    destination: `${faker.address.state()}, ${faker.address.city()}, ${parseInt(faker.address.zipCode())}`,
                    totalPrice : faker.datatype.float(),


                }
                orders.push(newOrder);
                history.push(newHistory);
            }
            for (let i = 0; i < 3; i++) { 
                let newOrder = { 
                    title : `Commande ${Math.floor(Math.random()*10000)}` ,               
                    client: clientids[Math.floor(Math.random()*clientids.length)] , 
                    deliveryMan :deliveryMenids[Math.floor(Math.random()*deliveryMenids.length)] , 
                    depot: depotsids[1]  ,
                    article:articlesids[Math.floor(Math.random()*articlesids.length)] ,
                    livraison:livraisonsids[Math.floor(Math.random()*livraisonsids.length)] ,
                    status: "CONFIRMED",
                    startDate: faker.date.between('2022-04-06', '2022-04-30'),
                    endDate: faker.datatype.datetime(),
                    destination: `${faker.address.state()}, ${faker.address.city()}, ${parseInt(faker.address.zipCode())}`,
                    latitude : faker.address.latitude(),
                    longitude : faker.address.longitude(),
                    totalPrice : faker.datatype.float(),
                    informationsSupp :  faker.hacker.phrase()
                }
                orders.push(newOrder);
            }
            await ordersCollection.insertMany(orders);
            console.log("Database seeded! :)");
        }

    
    } catch (err : any) {
        console.log( "--------------------------",err.stack, "--------------------------");
    }
}

seedDB();