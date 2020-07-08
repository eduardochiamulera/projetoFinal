var app = new Vue({
    el: '#app',
    data: {
        errorMsg: "",
        successMsg:"",
        showAddModal:false,
        showEditModal:false,
        showDeleteModal:false,
        lojas: [],
        novaLoja: { 
            nome: "",
            telefone: "",
            endereco: "",
            cep: "",
            bairro: "",
            cidade: "",
            estado: "",
            complemento: "",
            numero: "",
        },
        currentProduct: {}
    },
    mounted:function(){
        this.getAllLojas();
    },
    methods:{
        getAllLojas(){
            axios.get("http://localhost:8000/api/lojas")
            .then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data;
                }else{
                    app.lojas = response.data;
                }
            }).catch(function(error){
                app.errorMsg = error.data;
            })
        },
        goProdutos(){
            window.location.href = 'http://localhost:8000/index.html'
        },
        buscarCep(cep){
            const self = this;
            axios.get("https://viacep.com.br/ws/" + cep + "/json/")
            .then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data;
                }else{
                    self.novaLoja.cep = response.data.cep;
                    self.novaLoja.endereco = response.data.logradouro;
                    self.novaLoja.complemento = response.data.complemento;
                    self.novaLoja.cidade = response.data.localidade;
                    self.novaLoja.estado = response.data.uf;
                    self.novaLoja.bairro = response.data.bairro;
                }
            }).catch(function(error){
                app.errorMsg = error.data;
            })
        },
        salvar(){
            this.novaLoja.complemento = this.novaLoja.complemento === null ? "" : this.novaLoja.complemento;
            this.addLoja(this.novaLoja);
        },
        addLoja(novaLoja){
            const self = this;
            axios.post("http://localhost:8000/api/lojas",novaLoja)
            .then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }else{
                    self.novaLoja = {
                            nome: "",
                            telefone: "",
                            endereco: "",
                            cep: "",
                            bairro: "",
                            cidade: "",
                            estado: "",
                            complemento: "",
                            numero: "",
                        },
                    app.successMsg = "Loja Cadastrado com sucesso";
                    self.getAllLojas();
                }
            }).catch(function(error){
                app.errorMsg = error;
            })
        },
        atualizar(loja){
            this.novaLoja = loja;
        },
        putLojas(novaLoja){
            const self = this;
            axios.put("http://localhost:8000/api/lojas/"+novaLoja.id,novaLoja)
            .then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }else{
                    self.novaLoja = {
                        nome: "",
                        telefone: "",
                        endereco: "",
                        cep: "",
                        bairro: "",
                        cidade: "",
                        estado: "",
                        complemento: "",
                        numero: "",
                    },
                    app.successMsg = "Loja Atualizada com sucesso";
                    self.getAllLojas();
                }
            }).catch(function(error){
                app.errorMsg = error.data;
            })
        },
        deleteLojas(novaLoja){
            const self = this;
            axios.delete("http://localhost:8000/api/lojas/"+novaLoja.id)
            .then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }else{
                    self.novaLoja = {
                        nome: "",
                        telefone: "",
                        endereco: "",
                        cep: "",
                        bairro: "",
                        cidade: "",
                        estado: "",
                        complemento: "",
                        numero: "",
                    }
                    if(response.data.errorInfo != null){
                        app.errorMsg = response.data.errorInfo[2];
                    }
                    else{
                        app.successMsg = "Loja Deletada com sucesso";                    
                    }
                    self.getAllLojas();
                }
            }).catch(function(error){
                app.errorMsg = error.data;
            })
        },
    }
})