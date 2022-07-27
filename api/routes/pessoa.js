// Importações
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const modelPessoa = mongoose.model("Pessoa");

router.post("/", async (req, res, next) => {
  try {
    let pessoa = new modelPessoa({});
    pessoa.nome = req.body.nome;
    pessoa.sobrenome = req.body.sobrenome;
    pessoa.telefone = req.body.telefone;
    pessoa.email = req.body.email;
    pessoa.status = req.body.status;

    pessoa = await pessoa.save();
    res.status(201).json({
      message: "Parabéns Pessoa criado com Sucesso",
      CriarPessoa: {
        nome: pessoa.nome,
        sobrenome: pessoa.sobrenome,
        telefone: pessoa.telefone,
        email: pessoa.email,
        status: pessoa.status,
        _id: pessoa._id,
        request: {
          type: "GET",
          url: "http://localhost:3000/pessoa/" + pessoa._id,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const pessoas = await modelPessoa.find({}).select("nome email telefone");

    res.status(200).json({
      totalderegistros: pessoas.length,
      pessoas: pessoas.map((pessoa) => {
        return {
          nome: pessoa.nome,
          sobrenome: pessoa.sobrenome,
          telefone: pessoa.telefone,
          email: pessoa.email,
          status: pessoa.status,
          _id: pessoa._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/pessoa/" + pessoa._id,
          },
        };
      }),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/:pessoaId", async (req, res, next) => {
  const id = req.params.pessoaId;
  console.log(id);

  try {
    const pessoa = await modelPessoa.findOne({ _id: id });
    if (pessoa) {
      res.status(200).json({
        pessoa: pessoa,
        request: {
          type: "GET",
          url: "http://localhost:3000/pessoa",
        },
      });
    } else {
      res.status(404).json("Pessoa não existe!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:pessoaId", async (req, res, next) => {
  const id = req.params.pessoaId;

  try {
    let status = await modelPessoa.deleteOne({ _id: id });

    res.status(200).json({
      message: "Pessoa deletado",
      status: status,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
