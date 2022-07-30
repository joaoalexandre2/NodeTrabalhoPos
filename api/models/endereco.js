const { default: mongoose } = require("mongoose");

let enderecoSchema = new mongoose.Schema(
  {
    pessoa_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pessoa" },
    cep: { type: String, required: true },
    logradouro: { type: String },
    numero: { type: Number },
    complemento: { type: String },
    bairro: { type: String },
    cidade: { type: String },
    uf: { type: String },
  },

  {
    timestamps: true,
  }
);

mongoose.model("Endereco", enderecoSchema);
