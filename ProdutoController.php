<?php
include_once('Loja.php');
include_once('LojaDAO.php');
include_once('Produto.php');
include_once('ProdutoDAO.php');

class ProdutoController {

    public function listar($request, $response, $args){
        $dao= new ProdutoDAO;    
        $produtos = $dao->listar();
    
        return $response->withJSON($produtos);
    
    }

    public function inserir($request, $response, $args) {
        $data = $request->getParsedBody();
        
        $LojaDao = new LojaDAO;
        $loja = $LojaDao->buscarPorId($data['loja']['id']);
    
        $produto = new Produto(0,$data['nome'],$data['preco'],$data['quantidade'],$loja);
    
        $dao = new ProdutoDAO;
        $produto = $dao->inserir($produto);
    
        return $response->withJson($produto,201);
    }

    public function buscarPorId($request, $response, $args) {
        $id = $args['id'];
        
        $dao= new ProdutoDAO;    
        $produto = $dao->buscarPorId($id);
        
        return $response->withJson($produto);
    }
    
    public function atualizar($request, $response, $args) {
        $id = $args['id'];
        $data = $request->getParsedBody();

        $LojaDao = new LojaDAO;
        $loja = $LojaDao->buscarPorId($data['loja']['id']);
    
        $produto = new Produto($id,$data['nome'],$data['preco'],$data['quantidade'],$loja);
    
        $dao = new ProdutoDAO;
        $produto = $dao->atualizar($produto);
    
        return $response->withJson($produto);
    }
    
    public function deletar($request, $response, $args) {
        $id = $args['id'];
    
        $dao = new ProdutoDAO;
        $produto = $dao->deletar($id);
    
        return $response->withJson($produto);
    }
}
?>