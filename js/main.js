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
        novoProduto: { 
            nome: "", 
            preco: "", 
            quantidade: "", 
            loja: {
                id : "",
                nome: ""
             }
        },
        currentProduct: {}
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
                    app.produtos = response.data;
                }
            }).catch(function(error){
                app.errorMsg = error.data.message;
            })
        },
        addProduto(novoProduto){
            console.log("addProduto" + novoProduto.loja.id);
            axios.post("http://localhost:8000/api/produtos",novoProduto)
            .then(function(response){
                if(response.data.error){
                    app.errorMsg = response.data.message;
                }else{
                    app.produtos = response.data;
                }
            }).catch(function(error){
                app
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
        salvar(){
            this.addProduto(this.novoProduto);
        }
    }
})