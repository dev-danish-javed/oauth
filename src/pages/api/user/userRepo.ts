import { MongoClient, ServerApiVersion } from 'mongodb';
import { DefaultSession, User } from 'next-auth';
const UserRepo = () => {
    const uri =process.env.DB_URL||"";
    const RESUME_DB = 'oauthDb';
    const candidateCollection = 'user';
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    const saveDetails = async (user: User): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            let result = null;
            try {
                await client.connect();
                const db = client.db(RESUME_DB);
                let existingUserByEmail = await db.collection(candidateCollection).findOne({email:user.email})
                if(!existingUserByEmail){
                    result = await db
                    .collection(candidateCollection)
                    .insertOne(user);
                }
                
            } catch (e) {
                reject(e);
            } finally {
                await client.close();
            }
            if (result) resolve(result.insertedId.toString());
        });
    };

    async function testConnection() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            // Send a ping to confirm a successful connection
            await client.db('admin').command({ ping: 1 });
            console.log(
                'Pinged your deployment. You successfully connected to MongoDB!',
            );
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    return { saveDetails, testConnection };
};

export default UserRepo;
