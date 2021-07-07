const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());


const courses = [
  {id: 1, name: 'course1'},
  {id: 2, name: 'course2'},
  {id: 3, name: 'course3'}
]


app.get('/', (req, res)=>{
  res.send('Hello world@@@')
});

app.get('/api/courses', (req, res)=>{
  res.send(courses)
  // console.log('res----> ' + res.send);
  // console.log('req----> ' + req.query);
});

app.get('/api/courses/:id', (req, res)=>{
  let course = courses.find(c => c.id === parseInt(req.params.id))
  if(!course) res.status(404).send('The course with the given ID was not found.');
  res.send(course);
  console.log(req.body.name);
});


app.post('/api/courses', (req, res, next)=>{

  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  const result = schema.validate(req.body);
  if(result.error){
    res.status(400).send(result.error);
    return;
  }
  const course = {
    id: courses.length+1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res)=>{
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('The course is not found')
  if(course) res.send(course);


})


app.listen(3000, ()=>{
  console.log('Server is running on port 3000');
})