var app = new Vue({
    el: '#app',
    data: {
        errorMsg: "",
        successMsg:"",
        showAddModal:false,
        showEditModal:false,
        showDeleteModal:false,
        produtos: [],
        lojas: [],
        search:'',
        novoProduto: { 
            nome: "", 
            preco: "", 
            quantidade: "", 
            loja: {
                id : "",
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
        },
        currentProduct: {}
    },
    computed:{
        filterProduto: function(){
            return this.produtos.filter((produto) =>{
                return produto.nome.toLowerCase().match(this.search.toLowerCase());
            })
        }
    },
    mounted:function(){
        this.getAllProdutos();
        this.getAllLojas();
    },
    methods:{
        getAllProdutos(){
            axios.get("http://localhost:8000/api/produtos")
            .then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }else{
                    debugger;
                    app.produtos = response.data;
                }
            }).catch(function(error){
                app.errorMsg = error.data;
            })
        },
        addProduto(novoProduto){
            const self = this;
            console.log("addProduto " + novoProduto.loja.id);
            axios.post("http://localhost:8000/api/produtos",novoProduto)
            .then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }else{
                    self.novoProduto = {
                        nome: "", 
                        preco: "", 
                        quantidade: "", 
                        loja: {
                            id : "",
                            nome: "",
                            telefone: "",
                            endereco: "",
                            cep: "",
                            bairro: "",
                            cidade: "",
                            estado: "",
                            complemento: "",
                            numero: "",
                        }}
                    app.successMsg = "Produto Cadastrado com sucesso";
                    self.getAllProdutos();
                }
            }).catch(function(error){
                app.errorMsg = error;
            })
        },
        getAllLojas(){
            axios.get("http://localhost:8000/api/lojas")
            .then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data;
                }else{
                    app.lojas = response.data;
                    console.log(app.lojas)
                }
            }).catch(function(error){
                app.errorMsg = error.data;
            })
        },
        putProdutos(novoProduto){
            const self = this;
            axios.put("http://localhost:8000/api/produtos/"+novoProduto.id,novoProduto)
            .then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }else{
                    self.novoProduto = {
                        nome: "", 
                        preco: "", 
                        quantidade: "", 
                        loja: {
                            id : "",
                            nome: "",
                            telefone: "",
                            endereco: "",
                            cep: "",
                            bairro: "",
                            cidade: "",
                            estado: "",
                            complemento: "",
                            numero: "",
                        }}
                    app.successMsg = "Produto Atualizado com sucesso";
                    self.getAllProdutos();
                }
            }).catch(function(error){
                app.errorMsg = error.data;
            })
        },
        deleteProdutos(novoProduto){
            const self = this;
            axios.delete("http://localhost:8000/api/produtos/"+novoProduto.id)
            .then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }else{
                    self.novoProduto = {
                        nome: "", 
                        preco: "", 
                        quantidade: "", 
                        loja: {
                            id : "",
                            nome: "",
                            telefone: "",
                            endereco: "",
                            cep: "",
                            bairro: "",
                            cidade: "",
                            estado: "",
                            complemento: "",
                            numero: "",
                        }}
                    app.successMsg = "Produto Deletado com sucesso";                    
                    self.getAllProdutos();
                }
            }).catch(function(error){
                app.errorMsg = error.data;
            })
        },
        salvar(){
            this.novoProduto.loja.id = this.novoProduto.loja.id.replace("Loja","");
            this.addProduto(this.novoProduto);
            console.log("salvar " + this.novoProduto)
        },
        atualizar(produto){
            this.novoProduto = produto;
        },
        goLojas(){
            window.location.href = 'http://localhost:8000/lojas.html'
        },
    }
})