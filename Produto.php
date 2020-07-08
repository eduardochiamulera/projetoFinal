<?php
    include_once 'Loja.php';

    class Produto {
        public $id;
        public $nome;
        public $preco;
        public $quantidade;
        public $loja;

        function __construct($id, $nome, $preco, $quantidade, Loja $loja){
            $this->id = $id;
            $this->nome = $nome;
            $this->preco = $preco;
            $this->quantidade = $quantidade;
            $this->loja = $loja;
        }
    }
?>