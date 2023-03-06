const express = require("express");
const morgan = require("morgan");

const PORT = 3001;
const app = express();

app.use(morgan("combined"));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

function generateId() {
  return Math.ceil(Math.random() * 10000) + Date.now();
}

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    return response.status(404).end();
  }

  response.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  person["id"] = generateId();

  if (!(person.name || person.number)) {
    return res.status(400).json({
      error: "Invalid data",
    });
  }

  if (persons.find((item) => item.name === person.name)) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  }

  persons = persons.concat(person);

  res.json(person);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
