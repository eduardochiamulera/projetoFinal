<?php
    class Loja {
        public $id;
        public $nome;
        public $endereco;
        public $telefone;
        public $cep;
        public $bairro;
        public $complemento;
        public $numero;
        public $cidade;
        public $estado;

        function __construct($id, $nome, $endereco,$telefone, $cep, $bairro,$complemento,$numero,$cidade,$estado){
            $this->id = $id;
            $this->nome = $nome;
            $this->endereco = $endereco;
            $this->telefone = $telefone;
            $this->cep = $cep;
            $this->bairro = $bairro;
            $this->complemento = $complemento;
            $this->numero = $numero;
            $this->cidade = $cidade;
            $this->estado = $estado;
        }
    }
?>