const mongoose = require('mongoose');
const fs = require('fs');
const xml2js = require('xml2js');

mongoose.connect('mongodb+srv://khadymbackediop1:diop%402000@cluster1psgbd.jat7mas.mongodb.net/dblp');

const authorSchema = new mongoose.Schema({
    name: String
});

const Author = mongoose.model('Author', authorSchema);

fs.readFile('dblp.xml', async (err, data) => {
    if (err) {
        console.error('Error reading XML file:', err);
        return;
    }

    xml2js.parseString(data, async (err, result) => {
        if (err) {
            console.error('Error parsing XML file:', err);
            return;
        }

        const authors = result.dblp.article.map(article => ({ name: article.author[0] }));

        try {
            await Author.insertMany(authors);
            console.log('Successfully inserted authors into MongoDB');
        } catch (err) {
            console.error('Error inserting authors into MongoDB:', err);
        } finally {
            mongoose.connection.close();
        }
    });
});
