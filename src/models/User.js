const mongoose = require("../database");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      require: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    passwordresetoken: {
      type: String,
      select: false
    },
    passwordexpires:{
      type: Date,
      sselect:false,
    },
    usuario_validado: {
      type: Boolean
    },
    cpf: {
      type: String,
      required: true
    },
    user_cuidador: {
      type: Boolean
    },
    avatar: {
      nome: {
        type: String,
        default: "default.png"
      },
      path: { type: String, default: "default.png" }
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toObject: {
      getters: true,
      setter: true,
      virtuals: true
    },
    toJSON: {
      getters: true,
      setter: true,
      virtuals: true
    }
  }
);

UserSchema.virtual("url").get(function() {
  console.log(this.avatar.path);
  return `http://localhost:3000/files/${this.avatar.path}`;
});

// transformando a senha do usuario em hash antes de enviar para o banco

UserSchema.pre("save", async function(next) {
  const salt = bcrypt.genSaltSync(10);
  console.log(salt);
  const hash = await bcrypt.hash(this.password, salt);
  console.log(hash);
  this.password = hash;
  next();
});


const UserModel = mongoose.model("tb_users", UserSchema);
export default UserModel;
