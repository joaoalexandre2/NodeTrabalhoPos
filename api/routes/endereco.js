// Importações
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const modelEndereco = mongoose.model("Endereco");
const modelPessoa = mongoose.model('Pessoa');

router.post('/', async (req, res, next) => {
  try {
      if (!req.body.pessoaId) {
          res.status(404)
          .json({message: "Pessoa não existe"});
          return;
      }

      let pessoa = null;
      try {
        pessoa = await modelPessoa.findById(req.body.pessoaId)
        if (!pessoa) {
          res.status(404)
          .json({message: "pessoa não existe"});
          return;
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
      
      if (pessoa) {
       
        let endereco = new modelEndereco({
        cep:  req.body.cep,
        logradouro: req.body.logradouro,
        numero : req.body.numero,
        complemento : req.body.complemento,
        bairro : req.body.bairro,
        cidade : req.body.cidade,
        uf : req.body.uf
          });
          endereco = await endereco.save();
          res.status(201).json({
              message: 'Endereço criado com sucesso!',
              CriandoNovoEndereco: {
                cep: endereco.cep,
                logradouro: endereco.logradouro,
                numero: endereco.numero,
                complemento: endereco.complemento,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                uf: endereco.uf,
                _id: endereco._id,
                  request: {
                      type: "GET",
                      url: "http://localhost:3000/endereco/" + endereco._id
                  }
              }
          })
      }
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});









router.get("/", async (req, res, next) => {
  try {
    const enderecos = await modelEndereco.find({}).select("cep numero complemento bairro cidade uf");

    res.status(200).json({
      totalderegistros: enderecos.length,
      enderecos: enderecos.map((endereco) => {
        return {
            cep: endereco.cep,
            logradouro: endereco.logradouro,
            numero: endereco.numero,
            complemento: endereco.complemento,
            bairro: endereco.bairro,
            cidade: endereco.cidade,
            uf: endereco.uf,
            _id: endereco._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/endereco/" + endereco._id,
          },
        };
      }),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/:enderecoId", async (req, res, next) => {
  const id = req.params.enderecoId;
  console.log(id);

  try {
    const product = await modelEndereco.findById(id);
    if (product) {
      res.status(200).json({
        endereco: endereco,
        request: {
          type: "GET",
          url: "http://localhost:3000/endereco",
        },
      });
    } else {
      res.status(404).json("Endereço não existe!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:enderecoId", async (req, res, next) => {
  const id = req.params.enderecoId;

  try {
    let status = await modelEndereco.deleteOne({ _id: id });

    res.status(200).json({
      message: "Endereço deletado",
      status: status,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;