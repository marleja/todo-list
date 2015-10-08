window.onload = function()
{
	listadoTareass = [];
	var indEdita = -1; //El índice de Edición...
	var elementos = ["tarea"];
	//Constructor Tareas...
	function Tareas( trs)
	{
		
		this.tareashacer = trs;
		
		//Para devolver los datos del usuario a ser impresos...
		this.imprime = function()
		{
			return [						
						this.tareashacer 
					];
		}
	}

	//Para cargar la información de localStorage...
	if(localStorage.getItem("listado"))
	{
		var objTMP = eval(localStorage.getItem("listado"));
		var  trs =  "";
		for(var i in objTMP)
		{
		
			var trs = objTMP[i].tareashacer;
			var nuevaTareas = new Tareas(trs);
			listadoTareass.push(nuevaTareas);
		}
	}
	//imprimeUsuarios();
	//Imprimer usuarios en pantalla...
	var imprimeUsuarios = (function imprimeUsuarios()
	{
		var txt = "<table class = 'table-fill'>" + 
				
				  "<tbody class = 'table-hover'>";
		for(var i = 0; i < listadoTareass.length; i++)
		{
			txt += "<tr>";
			var datosTareas = listadoTareass[i].imprime();
			//chulo
			txt += "<td><center>";
			txt += "<img src = 'img/like.png' border = '0' id = 'e_"+i+"'/>";
			txt += "</center</td>";
			//datos tareas
			for(var c = 0; c < datosTareas.length; c++)
			{
				txt += "<td><center>"+(datosTareas[c])+"</center></td>";
			}
			//Eliminar...
			txt += "<td><center>";
			txt += "<img src = 'img/trash.png' border = '0' id = 'd_"+i+"'/>";
			txt += "</center</td>";
			txt += "</tr>";
		}
		txt += "</tbody></table>";
		nom_div("imprime").innerHTML = txt;
		//Poner las acciones de editar y eliminar...
		for(var i = 0; i < listadoTareass.length; i++)
		{
			
			//Editar...
			nom_div("e_" + i).addEventListener('click', function(event)
			{
				var ind = event.target.id.split("_")[1];
				var idUser = listadoTareass[ind].identificacion;
				console.log("Valor de idUser: ", idUser);
				ind = buscaIndice(idUser);
				if(ind >= 0)
				{
					nom_div("identifica").value = listadoTareass[ind].identificacion;
					nom_div(tarea).value = listadoTareass[ind].tareashacer;
					nom_div("apellido").value = listadoTareass[ind].primerapellido;
					nom_div("email").value = listadoTareass[ind].email;
					nom_div("fechanace").value = listadoTareass[ind].fechanacimiento;
					indEdita = ind;
				}
				else
				{
					alert("No existe el ID");
				}
			});
			//Eliminar...
			nom_div("d_" + i).addEventListener('click', function(event)
			{
				var ind = event.target.id.split("_")[1];
				var idUser = listadoTareass[ind].identificacion;
				if(confirm("¿Está segur@ de realizar está acción?"))
				{
					ind = buscaIndice(idUser);
					if(ind >= 0)
					{
						listadoTareass.splice(ind, 1);
						localStorage.setItem("listado", JSON.stringify(listadoTareass));
						indEdita = -1;
						imprimeUsuarios();
					}
				}
			});
		}
		return imprimeUsuarios;
	})();
	//Dada la identificación, buscar la posición donde se encuentra almacenado...
	var buscaIndice = function(id)
	{
		var indice = -1;
		for(var i in listadoTareass)
		{
			if(listadoTareass[i].identificacion === id)
			{
				indice = i;
				break;
			}
		}
		return indice;
	}

	//Limpia los campos del formulario...
	var limpiarCampos = function()
	{
		indEdita = -1; //No se está editando nada...
		for(var i = 0; i < elementos.length; i++)
		{
			nom_div(elementos[i]).value = "";	
		}
	}

	//Saber si un usuario ya existe, bien por identificación o por e-mail...
	

	//Acciones sobre el botón guardar...
	nom_div("guarda").addEventListener('click', function(event)
	{
		var correcto = true;
		var valores = [];
		for(var i = 0; i < elementos.length; i++)
		{
			if(nom_div(elementos[i]).value === "")
			{
				alert("Digite todos los campos");
				nom_div(elementos[i]).focus();
				correcto = false;
				break;
			}
			else
			{
				valores[i] = nom_div(elementos[i]).value;
			}
		}
		//Si correcto es verdadero...
		if(correcto)
		{
			
			if(existeDatos === 0) //No existe...
			{
				
					//No se estaba editando...
					if(indEdita < 0)
					{
						var nuevaTareas = new Tareas(valores[0]);
						listadoTareass.push(nuevaTareas);
					}
					else
					{
						
						listadoTareass[indEdita].tareashacer = valores[0];
						
					}

					localStorage.setItem("listado", JSON.stringify(listadoTareass));
					imprimeUsuarios();
					limpiarCampos();
				}
				else
				{
					alert("El correo no es válido");
					nom_div(elementos[3]).focus();
				}
			}
			else
			{
				if(existeDatos == 1)
				{
					alert("El usuario con la cédula: " + valores[0] + " Ya existe");
					nom_div(elementos[0]).focus();
				}
				else
				{
					alert("El correo : " + valores[3] + " Ya existe");
					nom_div(elementos[3]).focus();	
				}
			}
		
	});

	//Función que valida que un e-mail se encuentre "sintácticamente" bien escrito...
	

	//Accedera los elementos de HTML...
	function nom_div(div)
	{
		return document.getElementById(div);
	}
}