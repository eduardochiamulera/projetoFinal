<?php
    include_once 'Loja.php';
	include_once 'PDOFactory.php';

    class LojaDao
    {
        public function inserir(Loja $loja)
        {
            $qInserir = "INSERT INTO lojas(nome, endereco, telefone, cep, bairro, complemento, numero, cidade, estado) 
            VALUES (:nome, :endereco,:telefone,:cep,:bairro,:complemento,:numero,:cidade,:estado)";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInserir);
            $comando->bindParam(":nome",$loja->nome);
            $comando->bindParam(":telefone",$loja->telefone);
            $comando->bindParam(":endereco",$loja->endereco);
            $comando->bindParam(":cep",$loja->cep);
            $comando->bindParam(":bairro",$loja->bairro);
            $comando->bindParam(":complemento",$loja->complemento);
            $comando->bindParam(":numero",$loja->numero);
            $comando->bindParam(":cidade",$loja->cidade);
            $comando->bindParam(":estado",$loja->estado);
            $comando->execute();
            $loja->id = $pdo->lastInsertId();
            return $loja;
        }

        public function deletar($id)
        {
            $qDeletar = "DELETE from lojas WHERE id=:id";            
            $loja = $this->buscarPorId($id);
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qDeletar);
            $comando->bindParam(":id",$id);
            $comando->execute();
            return $loja;
        }

        public function atualizar(Loja $loja)
        {
            $qAtualizar = "UPDATE lojas SET nome=:nome, endereco=:endereco,telefone=:telefone 
            ,cep=:cep,bairro=:bairro,complemento=:complemento,numero=:numero
            ,cidade=:cidade,estado=:estado WHERE id=:id";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qAtualizar);
            $comando->bindParam(":nome",$loja->nome);
            $comando->bindParam(":telefone",$loja->telefone);
            $comando->bindParam(":endereco",$loja->endereco);
            $comando->bindParam(":cep",$loja->cep);
            $comando->bindParam(":bairro",$loja->bairro);
            $comando->bindParam(":complemento",$loja->complemento);
            $comando->bindParam(":numero",$loja->numero);
            $comando->bindParam(":cidade",$loja->cidade);
            $comando->bindParam(":estado",$loja->estado);
            $comando->bindParam(":id",$loja->id);
            $comando->execute();    
            return($loja);    
        }

        public function listar()
        {
		    $query = 'SELECT * FROM lojas';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $lojas=array();	
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $lojas[] = new Loja($row->id,$row->nome,$row->endereco, $row->telefone, $row->cep, $row->bairro, $row->complemento, $row->numero, $row->cidade, $row->estado);
            }
            return $lojas;
        }

        public function buscarPorId($id)
        {
 		    $query = 'SELECT * FROM lojas WHERE id=:id';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam ('id', $id);
		    $comando->execute();
            $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new Loja($result->id,$result->nome,$result->endereco, $result->telefone, $result->cep, $result->bairro, $result->complemento, $result->numero, $result->cidade, $result->estado);
        }
    }
?>