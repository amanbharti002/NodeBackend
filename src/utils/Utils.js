const bcrypt = require('bcryptjs')
exports.genPassword = (password)=>{
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password,salt);
}
exports.comparePassword =(hash,oldpass)=>{
    return bcrypt.compareSync(oldpass,hash)
}