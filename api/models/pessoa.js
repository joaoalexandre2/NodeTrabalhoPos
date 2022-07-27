// Importar Mongoose
const mongoose = require("mongoose");

let pessoaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    sobrenome: { type: String },
    telefone: { type: String },
    email: { type: String },
    status: { type: String },
  },

  {
    timestamps: true,
  }
);

mongoose.model("Pessoa", pessoaSchema);
