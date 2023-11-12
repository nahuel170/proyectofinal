function verificarRol(rol) {
    if(usuario.nombre === 'admin'){
      console.log('es admin')
  }
  else{
      console.log('no es admin')
  }
  
  next();
}
module.exports = {verificarRol};