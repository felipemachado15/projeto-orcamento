class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }
        return true;
    }
}


class Bd {
    constructor() {
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getProximoId() {
        let proximoId = localStorage.getItem('id') // null
        return parseInt(proximoId) + 1
    }
    gravar(d) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    
    recuperarTodosRegistros(){
        let despesas = Array()
      let id = localStorage.getItem('id')
      for(let i = 1; i<= id; i++){
          //recuperar a despesa
          let despesa = JSON.parse(localStorage.getItem(i))

          if(despesa===null){
              continue
          }
          despesas.push(despesa)
      
      }

    return despesas

    }
}
let bd = new Bd()


function cadastrarDespesas() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
        

    )

    
    if (despesa.validarDados()) {
        limparCampos();
        bd.gravar(despesa)
        ano.value = '';
        mes.value= '';
        dia.value= '';
        tipo.value= '';
        descricao.value= '';
        valor.value= '';
    
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
       document.getElementById('modal_btn').innerHTML = 'voltar' 
       document.getElementById('modal_btn').className = 'btn btn-success'    

        $('#modalRegistraDespesa').modal('show')
    } else {
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão dos registros'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro despesa não registrada'
        document.getElementById('modal_btn').innerHTML = 'voltar e corrigir' 
       document.getElementById('modal_btn').className = 'btn btn-danger'    
        $('#modalRegistraDespesa').modal('show')
    }

}

function carregaListaDespesas(){
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()
    //selecionando o elemento tbody da tabela
let listaDespesas = document.getElementById('listaDespesas');

//percorrer o array despesas,listando cada despesa de forma dinamica
despesas.forEach(function(d){

    // criando o tr
    let linha = listaDespesas.insertRow()

    //criar as colunas(td)

   linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
   switch(d.tipo){
    case '1':d.tipo = 'Alimentação'
    break;

    case '2':d.tipo = 'Educação'
    break;

    case '3':d.tipo = 'Lazer'
    break;

    case '4':d.tipo = 'Saúde'
    break;

    case '5':d.tipo = 'Transporte'
    break;
}
   linha.insertCell(1).innerHTML = d.tipo

  
   
   linha.insertCell(2).innerHTML = d.descricao
   linha.insertCell(3).innerHTML = d.valor
})
}
