import User from "../models/User";

class ProviderController {
  async mostrarCuidadores(req, res) {


    const teste = await User.find({user_cuidador: true}).select(['nome','email','url','avatar']);
    
 
    return res.json(teste);
  }
}

export default new ProviderController();
