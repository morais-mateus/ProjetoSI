import User from "../models/User";

class FileController {
  async store(req, res) {
    // Inserindo a foto de avatar no usuario
    try{
    const { originalname: name, filename: path } = req.file;

  

    const user = await User.findOne({ _id: req.userId });

    user.avatar.nome = name;
    user.avatar.path = path;
    await user.save();
    return res.json("Atualizado!");
    }
    catch (error){
      return res.status(400).json('Erro ao subir a imagem' + error);
    }
  }
}

export default new FileController();
