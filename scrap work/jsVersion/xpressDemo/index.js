const Joi = require('joi');
const express = require('express'); 
const app = express();

app.use(express.json()); 

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},  
];

app.get('/', (req, res) => {
    //when we get https get request to root a "route"
    res.send('Hello World!!!!');
});

app.get('/api/courses', (req,res) => {
    res.send(courses);
});

//api/courses/1
app.get('/api/courses/:id', (req,res) =>{
    var course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Course w/give ID was not found');
    res.send(course);
});

app.post('/api/courses', (req,res) => {
    const schema =  {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if(result.error){
        res.status(400).send(result.error);
        return; 
    }
    const course ={
        id: courses.length + 1,
        name: req.body.name,
    };

    courses.push(course);
    res.send(course);
});

// environment variable
// PORT 
const port = process.env.PORT || 4000; 
app.listen(port, ()=> console.log(`Listening on port ${port}...`));
