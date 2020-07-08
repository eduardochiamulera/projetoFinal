<?php
use Slim\Factory\AppFactory;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


include_once('LojaController.php');
include_once('ProdutoController.php');

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();
$app->addBodyParsingMiddleware();

$app->group('/api/lojas', function($app){
    $app->get('', 'LojaController:listar');
    $app->post('', 'LojaController:inserir');

    $app->get('/{id}', 'LojaController:buscarPorId');    
    $app->put('/{id}', 'LojaController:atualizar');
    $app->delete('/{id}', 'LojaController:deletar');
});

$app->group('/api/produtos', function($app){
    $app->get('', 'ProdutoController:listar');
    $app->post('', 'ProdutoController:inserir');

    $app->get('/{id}', 'ProdutoController:buscarPorId');    
    $app->put('/{id}', 'ProdutoController:atualizar');
    $app->delete('/{id}', 'ProdutoController:deletar');
});

$app->run();
?>