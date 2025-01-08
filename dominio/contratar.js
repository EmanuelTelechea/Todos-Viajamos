const Inmueble = {
  inmuebles: [],
  
  inicializar: function (){
  
    this.inmuebles = memoria.leer('inmuebles');

    let id = memoria.leer('idInmueble');
    if (id<1){
      memoria.escribir('idInmueble',1);
    }
    document.getElementById("id").value = memoria.leer('idInmueble');
    this.cargarDestino();
    
  },
  
  incrementoId: function(){
    let primerId = memoria.leer('idInmueble');
    memoria.escribir('idInmueble',primerId+1);
    document.getElementById("id").value = memoria.leer('idInmueble');
  },

  crear: function (id, username, password, nombre, apellido, cedula, telefono, cantidad, edad, email, tipoDestino, descripcion, terminosCondiciones, fecha) {  
      return {
          id             : id,
          username       :username,
          password        :password,
          nombre         : nombre,
          apellido       : apellido,
          cedula         : cedula,
          telefono       : telefono,
          cantidad       : cantidad,
          edad            :edad,
          email           :email,
          tipoDestino      : tipoDestino,
          descripcion      : descripcion,
          terminosCondiciones : terminosCondiciones,
          fecha             : fecha,
        };
  },
  alta: function(){
      const id = document.getElementById('id').value;
      if(id){
        if(this.buscarPosicion(id, this.inmuebles) >=0){         
          alert('Error en alta: repetido.');
        }else{
          const username       = document.getElementById("username").value;
          const password       = document.getElementById("password").value;
          const nombre         = document.getElementById("nombre").value;
          const apellido       = document.getElementById("apellido").value;
          const cedula         = document.getElementById("cedula").value;
          const telefono       = document.getElementById("telefono").value;
          const cantidad       = document.getElementById("cantidad").value;
          const edad           = document.getElementById("edad").value;
          const email          = document.getElementById("email").value;
          const descripcion    = document.getElementById("descripcion").value;
          const terminosCondiciones= document.getElementById("terminosCondiciones").value;
          const fecha          = document.getElementById("fecha").value;
      
          if(!nombre || !username || !apellido || !password || !telefono || !telefono|| !cantidad|| !email|| !terminosCondiciones|| !descripcion|| !fecha){
            alert("Debe completar todos los campos");
            return;
          }
          
          const objInmueble = this.crear(id, username, password, nombre, apellido, cedula, telefono, cantidad, edad, email, descripcion, terminosCondiciones, fecha);
          
          const radios = document.getElementsByName("tipoDestino");
          let tipoDestino = "";

          for (const radio of radios) {
            if (radio.checked) {
             tipoDestino = radio.value;
            break;
            }
          }
          this.inmuebles.push(objInmueble);
          this.reset();
          this.incrementoId();
          memoria.escribir('inmuebles', this.inmuebles);
        }
      }else{
        alert('Error en alta: debe ingresar todos los campos');
      }   
  },
   
  reset: function(){
        document.getElementById('abmPersona').reset();
        document.getElementById("id").value = memoria.leer('idInmueble');
  },

  buscarPosicion: function (id, array){
    for (let posicion = 0; posicion < array.length; posicion++) {
      const objeto = array[posicion];
      if (objeto.id == id){
        return posicion;
      }        
    }
    return -1;
},

  validoDatos: function(username, password, nombre, apellido, cedula, telefono, cantidad, edad, email, tipoDestino, descripcion, terminosCondiciones, fecha){
        if(username == "" ||password == "" ||cantidad == "" ||edad == "" ||email == "" ||tipoDestino == "" ||nombre == "" || apellido == "" || cedula == "" || telefono == "" || descripcion == ""|| terminosCondiciones == ""|| fecha == ""){
        return false;
    }
    return true;
  },

}
