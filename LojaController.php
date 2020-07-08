<?php

include_once('Loja.php');
include_once('LojaDAO.php');

class LojaController {

    public function listar($request, $response, $args){
        $dao= new LojaDAO;    
        $Lojas = $dao->listar();
    
       $response = $response->withJson($Lojas);
       $response = $response->WithStatus(200);
       return $response;
       
    }

    public function inserir($request, $response, $args) {
        $data = $request->getParsedBody();
        $Loja = new Loja(0,$data['nome'],$data['endereco'],$data['telefone'],$data['cep'],$data['bairro'],$data['complemento'],$data['numero'],$data['cidade'],$data['estado']);
    
        $dao = new LojaDAO;
        $Loja = $dao->inserir($Loja);
        $response = $response->withJson($Loja);
        $response = $response->WithStatus(201);
        return $response;
    }

    public function buscarPorId($request, $response, $args) {
        $id = $args['id'];
        
        $dao= new LojaDAO;    
        $Loja = $dao->buscarPorId($id);
        
        return $response->withJson($Loja);
    }
    
    public function atualizar($request, $response, $args) {
        $id = $args['id'];
        $data = $request->getParsedBody();
        $Loja = new Loja($id, $data['nome'],$data['endereco'],$data['telefone'],$data['cep'],$data['bairro'],$data['complemento'],$data['numero'],$data['cidade'],$data['estado']);
    
        $dao = new LojaDAO;
        $Loja = $dao->atualizar($Loja);
    
        return $response->withJson($Loja);
    }
    
    public function deletar($request, $response, $args) {
        $id = $args['id'];
    
        $dao = new LojaDAO;
        $Loja = $dao->deletar($id);
    
        return $response->withJson($Loja);
    }
}
?>