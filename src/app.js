const express = require("express");
const cors = require("cors");
const uuid = require('uuidv4')
// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} = request.body;

  const newRepository = {
    id: uuid.uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(newRepository)

  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO

  const {id} = request.params;

  const {title, techs, url} = request.body;

  const findIndexRepository = repositories.findIndex(repositorie => repositorie.id === id);

  if(findIndexRepository > -1) {

   
  
    repositories[findIndexRepository].title = title;
    repositories[findIndexRepository].techs = techs;
    repositories[findIndexRepository].url = url;
  
    return response.json(repositories[findIndexRepository]);
  }
  return response.status(400).json({err: 'Repository not exist'})


});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const findIndexRepository = repositories.findIndex(repositorie => repositorie.id === id);

  if(findIndexRepository > -1 ) {
    const reposiotry = repositories[findIndexRepository]
    repositories.splice(findIndexRepository, 1);
    return response.status(204).json()
  }
  return response.status(400).json({err: 'Repositorie not exist'})

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;
  const findIndexRepository = repositories.findIndex(repositorie => repositorie.id === id);

  if(findIndexRepository > -1 ) {
    
    repositories[findIndexRepository].likes = repositories[findIndexRepository].likes + 1

    return response.json(repositories[findIndexRepository])
  }
  return response.status(400).json({erro: 'Id given away not existe '})

});

module.exports = app;
