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
                    debugger;
                    app.errorMsg = response.data;
                }else{
                    debugger;
                    app.lojas = response.data;
                }
            }).catch(function(error){
                app.errorMsg = error.data;
            })
        }
    }
})